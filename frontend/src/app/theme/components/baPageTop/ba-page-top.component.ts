import {Component, Input, OnChanges} from '@angular/core';

import {GlobalState} from '../../global.state';

import { UserService, AuthService } from 'app/service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'ba-page-top',
  templateUrl: './ba-page-top.component.html',
  styleUrls: ['./ba-page-top.component.scss']
})
export class BaPageTop implements OnChanges {

  private loggedUserSubs: Subscription;
  public currentUser: any;
  public showExpireWarning: boolean;
  public diffDays: number;
  public showWarning: boolean;

  @Input() isAuthorized: boolean;

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;

  constructor(private _state:GlobalState, 
    private userService: UserService,
    private authService: AuthService,
    private router: Router) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  logout() {
    this.authService.logout().subscribe(res => {
      this.userService.currentUser = null;
      this.router.navigate(['/login']);
      this.showWarning = false;
      this.showExpireWarning = false;
      document.querySelector('body').classList.remove('has-main-warning', 'has-warning--account', 'has-warning--subscription');
    });
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
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
        document.querySelector('body').classList.add('has-main-warning', 'has-warning--account');
      } else if (this.diffDays <= 0) {
        this.showExpireWarning = true;
        document.querySelector('body').classList.add('has-main-warning', 'has-warning--subscription');
      } else {
        this.showWarning = false;
        this.showExpireWarning = false;
        document.querySelector('body').classList.remove('has-main-warning', 'has-warning--account', 'has-warning--subscription');
      }
    }
  }
}
