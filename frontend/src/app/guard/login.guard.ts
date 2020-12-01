import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../service';
import { AuthService } from '../service/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const expiredToken = this.authService.hasToken();
    if (!expiredToken) {
      this.authService.logout();
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
