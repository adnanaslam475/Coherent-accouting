import {
  HttpClient,
  HttpResponseBase,
  HttpErrorResponse,
  HttpEventType,
  HttpHeaders,
  HttpParams,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serialize } from 'app/shared/utilities/serialize';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { ErrorHandler } from '@angular/router/src/router';

export enum RequestMethod {
  Get = 'GET',
  Head = 'HEAD',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
  Options = 'OPTIONS',
  Patch = 'PATCH'
}

@Injectable()
export class ApiService {
  private token = '';

  constructor(private http: HttpClient) { }

  public get(path: string, args?: any, customHeaders?: HttpHeaders): Observable<any> {
    const options = {
      headers: customHeaders || this.getDefaultHeaders(),
      withCredentials: true
    };

    if (path.indexOf('File_Upload') !== -1) {
      options['responseType'] = 'blob';
    }

    if (path.indexOf('download-asins') !== -1) {
      options['responseType'] = 'text';
    }

    if (args) {
      options['params'] = serialize(args);
    }

    return this.http.get(path, options).catch(this.checkError.bind(this));
  }

  public getAll(path: string, customHeaders?: HttpHeaders): Observable<any> {
    const options = {
      headers: customHeaders,
      withCredentials: true
    };

    return this.http.get(path, options).catch(this.checkError.bind(this));
  }

  public post(path: string, body: any, customHeaders?: HttpHeaders): Observable<any> {
    return this.request(path, body, RequestMethod.Post, customHeaders);
  }

  public put(path: string, body: any): Observable<any> {
    return this.request(path, body, RequestMethod.Put);
  }

  public delete(path: string, body?: any): Observable<any> {
    return this.request(path, body, RequestMethod.Delete);
  }

  private request(path: string, body: any, method = RequestMethod.Post, customHeaders?: HttpHeaders): Observable<any> {
    const headers = customHeaders || this.getDefaultHeaders();
    const options: any = {
      headers,
      withCredentials: true
    };

    if (path.indexOf('download-selected-asins') !== -1) {
      options['responseType'] = 'text';
    }

    const req = new HttpRequest(method, path, body, options);

    return this.http
      .request(req)
      .filter(response => response instanceof HttpResponse)
      .map((response: HttpResponse<any>) => {
        return response.body;
      })
      .catch(error => this.checkError(error));
  }

  // Display error if logged in, otherwise redirect to IDP
  private checkError(error: any): any {
    if (error instanceof HttpErrorResponse) {
      if (this.is2xxStatus(error)) {
        return of(
          new HttpResponse({
            headers: error.headers,
            status: error.status,
            statusText: error.statusText,
            url: error.url
          })
        );
      }
    }
    if (error && error.status === 404) {
      // this.errorHandler(error);
    } else {
      // this.displayError(error);
    }
    throw error;
  }

  setToken(token) {
    this.token = token;
  }

  private is2xxStatus(response: HttpResponseBase): boolean {
    return response.status >= 200 && response.status < 300 && response.statusText === 'OK';
  }

  private getDefaultHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json').set('Content-Type', 'application/json');

    return headers;
  }
}
