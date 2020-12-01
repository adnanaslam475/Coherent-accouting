import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from './config.service';
import { AuthService } from 'app/service';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private router: Router,
    private toaster: ToastrService,
    private authService: AuthService
  ) { }

  public handleError(error, next?) {
    switch (error.status) {
      case 401:
        this.handleUnauthorized(next);
        break;
      case 404:
        this.handleUnauthorized(error);
        break
      case 409:
        this.handleConflict(error);
        break;
      case 403:
        this.handleUnauthorized(next);
        break;
      case 405:
        this.handleNotAllowed(error);
        break;
      case 0:
        this.handleServerError(error);
        break;
      default:
        this.handleServerError(error);
        break;
    }
  }

  private handleUnauthorized(next) {
    this.router.navigate(['/login']);
  }

  private notFound(error) {
    this.toaster.error(error.errorMessage);
    const currentRoute = this.router.url.split('/');

    this.router.navigate([currentRoute[0]]);
  }

  private handleServerError(error: any) {
    try {
      const errorObject = JSON.parse(JSON.stringify(error));
      this.toaster.error(errorObject);
    } catch (e) {
      this.toaster.error(error);
    }
    this.router.navigate(['']);
  }

  private handleConflict(error: any): void {
    const hideToastsArrCode: string[] = [];
    try {
      const errObj = JSON.parse(error.error);
      if (hideToastsArrCode.indexOf(errObj.code) < 0) {
        this.handleServerError(error);
      }
    } catch (e) {
      this.handleServerError(e);
    }
  }

  private handleNotAllowed(error: any) {
    const showToastr: any[] = [];
    try {
      const errObj = JSON.parse(error.error);
      if (showToastr.indexOf(errObj.code) >= 0) {
        this.handleServerError(error);
      }
    } catch (e) {
      this.handleServerError(e);
    }
  }

  private handleAccessDenied(error: any) {
    this.router.navigate(['']);
  }
}
