import { Component, OnInit, ViewEncapsulation, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserService } from '../../service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { SubscriptionDate } from '../../shared/interfaces/subscription-date';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, OnChanges, OnDestroy {
  private loggedUserSubs: Subscription;
  public currentUser: any;
  public expireDate: Date;
  public currentDate: Date;
  public showWarning: boolean;
  public showExpireWarning: boolean;
  public diffDays: number;
  public subscription: Subscription;
  @Input() isAuthorized: boolean;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    this.currentDate = new Date();
    this.showWarning = false;
    this.showExpireWarning = false;
  }

  public ngOnInit(): void {
    this.subscription = this.userService.subDays.subscribe(days => {
      this.checkSubscription(days.daysToExpire);
    });
  }

  public ngOnChanges(value) {
    if (value.isAuthorized) {
      this.isAuthorized = value.isAuthorized.currentValue;
    }

    if (this.isAuthorized) {
      // this.getSubscribtionDate();
      this.loggedUserSubs = this.userService.getMyInfo().subscribe(res => {
        this.currentUser = res;
      });
    }
  }

  public logout(): void {
    this.authService.logout().subscribe(res => {
      this.router.navigate(['/login']);
    });
  }

  public ngOnDestroy() {
    if (this.loggedUserSubs) {
      this.loggedUserSubs.unsubscribe();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // public getSubscribtionDate() {
  //   this.userService.getSubscribtionDate().subscribe(days => {
  //     this.checkSubscription(days.daysToExpire);
  //   });
  // }

  private checkSubscription(days: number) {
    if (days) {
      this.diffDays = days;
      if (this.diffDays > 0 && this.diffDays <= 10) {
        this.showWarning = true;
      } else if (this.diffDays <= 0) {
        this.showExpireWarning = true;
      } else {
        this.showWarning = false;
        this.showExpireWarning = false;
      }
    }
  }

  public logoutClicked(event: boolean) {
    this.showWarning = event;
    this.showExpireWarning = event;
  }
}
