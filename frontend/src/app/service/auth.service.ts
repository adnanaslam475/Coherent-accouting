import { HttpHeaders, HttpRequest, HttpHandler, HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/observable/timer';
import { RequestOptions, Http } from '@angular/http';
import { LoginTemp } from '../shared/interfaces/token-temp';
import { HttpOptions } from '../core/http/http-options';
import { Country } from 'app/shared/interfaces/user-statistics';

@Injectable()
export class AuthService {
  private isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  private cachedRequests: Array<HttpRequest<any>> = [];
  public jwtHelper: JwtHelper = new JwtHelper();

  constructor(private apiService: ApiService, private config: ConfigService, private router: Router, private http: HttpClient) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser) {
      this.startupTokenRefresh(currentUser);
    }
  }

  public getToken(): string {
    return localStorage.getItem('currentUser');
  }


  public setToken(token: string): void {
    localStorage.setItem('currentUser', token);
  }

  public getRefreshToken(): string {
    return localStorage.getItem('currentUserRefresh');
  }

  public setRefreshToken(token: string): void {
    localStorage.setItem('currentUserRefresh', token);
  }

  public getIpAddress(): Observable<any> {
    return this.http.get(this.config.getIp);
  }

  public removeToken(): void {
    localStorage.removeItem('currentUser');
  }

  public removeRefreshToken(): void {
    localStorage.removeItem('currentUserRefresh');
  }

  public validateAccess(): Observable<any> {
    return this.getIpAddress().flatMap(data => {
      data = data || {};
      return this.apiService.post(this.config.validateAccess, {ip: data.ip}).map((data) => {
        const allowed = data && data.allowed || false;
        this.isLoginSubject.next(allowed);
        return allowed;
      });
    });
  }

  public login(user): Observable<any> {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Basic ' + btoa('acme:acmesecret'));

      const params = new HttpParams()
        .set('grant_type', 'password')
        .set('username', user.username)
        .set('password', user.password);
    return this.apiService.post(this.config.getToken, params, headers).map(res => {
      this.apiService.setToken(res.access_token);
      const setToken = JSON.stringify({ username: user.username, token: res.access_token });
      this.setToken(setToken);
      const setRefreshToken = JSON.stringify({ username: user.username, token: res.refresh_token });
      this.setRefreshToken(setRefreshToken);
      this.startupTokenRefresh(user);
    });
  }

  public refreshToken(user): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Basic ' + btoa('acme:acmesecret'));
    const refreshToken: any =  this.getRefreshToken();
    const token = !refreshToken ? null : JSON.parse(refreshToken);
    if (token && token.token && tokenNotExpired(null, token.token)) {
      this.setToken(JSON.stringify({ username: user.username, token: '' }));
      const params = new HttpParams()
        .set('grant_type', 'refresh_token')
        .set('refresh_token', token.token);
      return this.apiService.post(this.config.getToken, params, headers).map(res => {
        this.apiService.setToken(res.access_token);
        const setToken = JSON.stringify({ username: user.username, token: res.access_token });
        this.setToken(setToken);
        const setRefreshToken = JSON.stringify({ username: user.username, token: res.refresh_token });
        this.setRefreshToken(setRefreshToken);
        this.startupTokenRefresh(user);
        return;
      });
    }
    return Observable.throw("Refresh token has expired");
  }

  public signup(user, token: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');

    return this.apiService.post(this.config.signup_url, JSON.stringify(user), headers).map(() => { });
  }

  public countries(token: string): Observable<Country[]> {
    let headers = new HttpHeaders();
    headers = headers
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
    return this.apiService.getAll(this.config.userCountries, headers);
  }

  public logout(): Observable<any> {
    this.isLoginSubject.next(false);
    this.removeToken();
    this.removeRefreshToken();
    return Observable.of({}).delay(1000);
  }

  public changePassowrd(passwordChanger): Observable<any> {
    return this.apiService.post(this.config.change_password_url, passwordChanger);
  }

  public forgotPassword(payload, tempToken: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers
      .set('Authorization', 'Bearer ' + tempToken)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');

    return this.apiService.post(this.config.forgot_password_url, payload, headers);
  }

  public hasToken(): boolean {
    const token = this.getToken();
    return token ? tokenNotExpired(null, JSON.parse(token).token) : false;
  }

  public isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  public isAuthenticated(): void {
    const token = this.getToken();
    if (token) {
      this.isLoginSubject.next(true);
    } else {
      this.isLoginSubject.next(false);
      this.router.navigate(['/login']);
    }
  }


  public processTokenResponse(token) {
    const currentToken = JSON.parse(this.getToken());
    currentToken.token = token['token'];
    this.removeToken();
    this.setToken(JSON.stringify(currentToken));
    return currentToken;
  }

  public startupTokenRefresh(user) {
    if (this.hasToken()) {
      const token = JSON.parse(this.getToken()).token;
      const source = Observable.of(token).flatMap(val => {
        const now: number = new Date().valueOf() / 1000;
        const jwtExp: number = this.jwtHelper.decodeToken(val).exp;
        const iat = new Date(this.jwtHelper.decodeToken(val).iat).getTime() / 1000;

        const refreshTokenThreshold = 10;

        let delay: number = jwtExp - now;
        const totalLife: number = jwtExp - iat;

        if (delay < refreshTokenThreshold) {
          delay = 1;
        } else {
          delay = delay - refreshTokenThreshold;
        }
        return Observable.timer(delay * 1000);
      });
      source.subscribe(() => {
        this.refreshToken(user).subscribe(
          res => {
          },
          error => {
            this.logout();
            this.router.navigate(['/login']);
          });
      });
    }
  }

  public getTempToken() {
    let headers = new HttpHeaders();
    headers = headers
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic ' + btoa('register-app:acmesecret'));

    const params = new HttpParams().set('grant_type', 'client_credentials');

    return this.apiService.post(this.config.getToken, params, headers);
  }
}
