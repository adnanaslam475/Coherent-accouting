import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthService} from '../service';

@Injectable()
export class GuestGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    if (this.authService.hasToken()) {
      this.router.navigate(['/system']);
      return false;
    } else {
      return true;
    }
  }
}
