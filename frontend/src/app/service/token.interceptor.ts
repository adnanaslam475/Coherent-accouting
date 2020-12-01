import { Injectable, Inject, forwardRef, Injector } from '@angular/core';
// tslint:disable-next-line:ordered-imports
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// tslint:disable-next-line:ordered-imports
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { AuthService } from 'app/service';
import { ErrorHandlerService } from 'app/service/error-handler.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get AuthService
    const authenticationService = this.injector.get(AuthService);
    const tokenObject = authenticationService.getToken();
    const token = !tokenObject ? null : JSON.parse(tokenObject);
    if (token && token.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token.token}`
        }
      });
    }
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpErrorResponse) {
      }
    },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            authenticationService.logout();
            this.router.navigate(['/login']);
          }
        }
        return Observable.throw(err);
      }
    );
  }
}
