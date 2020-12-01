import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../service';

@Injectable()
export class ValidateAmazonSubscriptionGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userService.amazonSubscription.validate === undefined) {
      return true;
    }
    return this.isSubscrptionValid();
  }

  private isSubscrptionValid(): boolean {
    if (this.userService.amazonSubscription.validate) {
      return true;
    } else {
      this.router.navigate(['/system/my-plans']);
      return false;
    }
  }
}
