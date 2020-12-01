import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from 'app/service';
import {ToastContainerDirective, ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs/Subscription';
import {GlobalState} from "../../theme/global.state";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;
  private validateSubs: Subscription;
  private validateSubsDate: Subscription;
  public isMenuCollapsed = false;
  public diffDays: number;
  public showWarning: boolean;
  public showExpireWarning: boolean;

  constructor(private toasterService: ToastrService,
              private userService: UserService,
              private _state: GlobalState
  ) {
    this._state.subscribe('menu.isCollapsed', isCollapsed => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public ngOnInit() {
    this.toasterService.overlayContainer = this.toastContainer;
    // this.subscription();
  }

  public ngOnDestroy(): void {
    if (this.validateSubs) {
      this.validateSubs.unsubscribe();
    }
    if (this.validateSubsDate) {
      this.validateSubsDate.unsubscribe();
    }
  }

  // private subscription() {
  //   this.validateSubs = this.userService.validateSubscriptionsAll().subscribe(validate => {
  //     this.subscriptionDate();
  //   });
  // }

  // private subscriptionDate() {
  //   this.validateSubsDate = this.userService.getSubscriptionDateAll().subscribe(subDays => {
  //     this.checkSubscription(subDays.daysToExpire);
  //     this.userService.setSubscribtionDate(subDays);
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
}
