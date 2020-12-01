import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../service';

@Injectable()
export class ValidateAllSubscriptionsGuard implements CanActivate {

    constructor(private router: Router, private userService: UserService) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        // if (this.userService.ebaySubscription.validate === undefined) {
        //     return this.userService.validateSubscriptionsAll().map(() => {
        //         return this.isSubscrptionValid();
        //     });
        // }
        return this.isSubscrptionValid();
    }

    private isSubscrptionValid(): boolean {
        if (!this.userService.ebaySubscription.validate &&
            !this.userService.amazonSubscription.validate &&
            !this.userService.trackingSubscription.validate) {
            this.router.navigate(['/system/my-plans']);
            return false;
        } else {
            return true;
        }
    }
}
