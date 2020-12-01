import { Component, OnInit, TemplateRef, ViewChild, Inject, Injectable } from '@angular/core';
import { ValidateSubscriptionAll } from 'app/shared/interfaces/validate-subscriptions';
import { UserService } from '../../service';
import { UserLocation } from 'app/shared/interfaces/user-statistics';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ModalComponent } from 'app/shared/components/modal/modal-dialog.component';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-plans',
  templateUrl: './my-plans.component.html',
  styleUrls: ['./my-plans.component.scss']
})
export class MyPlansComponent implements OnInit {
  @ViewChild('paymentOptionTempl') paymentOptionTmpl: TemplateRef<any>;

  public loading: boolean;
  public rows: any[];
  public columns: any[];
  public gridOptions: any = {};
  public isForUpdate: boolean;

  constructor(private userService: UserService,
    private matDialog: MatDialog, private route: ActivatedRoute) {}

  ngOnInit() {
    this.loading = true;
    this.isForUpdate = this.route.snapshot.data['userLocation'].isForUpdate;
    // this.userService.isFullyRegistered().subscribe(
    //   (result: UserLocation) => {
    //     this.isFullyRegistered = result.isForUpdate;
    //   });
    this.columns = [
      {
        name: 'Service',
        prop: 'service',
        sortable: true
      },
      {
        name: 'Features included',
        prop: 'features',
        sortable: true,
        cellClass: 'features',
        width: 350
      },
      {
        name: 'Subscribed to date',
        prop: 'subscruptionDate',
        sortable: true,
        width: 150
      },
      {
        name: 'Days left',
        prop: 'subscriptionDaysleft',
        sortable: true,
        width: 150
      },
      {
        name: 'Payment option',
        cellTemplate: this.paymentOptionTmpl,
        sortable: false
      }
    ];
    this.rows = [];
    // this.userService.validateSubscriptionsAll().subscribe(
    //   (result: ValidateSubscriptionAll) => {
    //     this.rows = this.prepareData(result);
    //     this.loading = false;
    //   },
    //   () => {
    //     this.loading = false;
    //   }
    // );

  if(this.isForUpdate){
    this.openDialog();
  }
    

  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '350px';
    dialogConfig.disableClose = true;
    // dialogConfig.height = '400px';
    // dialogConfig.data = {};
    this.matDialog.open(ModalComponent, dialogConfig);
  }

  private prepareData(result: ValidateSubscriptionAll): any {
    const data = [
      {
        service: 'Tracking Generator',
        features: `
                   <p>${result.trackingLimit} UPS tracked packages by Zip Code/day</p>
                   
                  `,
        subscruptionDate: result.trackingSubscriptionDate,
        subscriptionDaysleft: result.trackingSubscriptionDaysLeft
      },
      {
        service: 'Ebay scout',
        features: `
                  <p>Unlimited search for competitors</p>
                  <p>Unlimited saved competitors</p>
                  <p>Unlimited competitor research</p>
                  <p>Unlimited items match search</p>
                  <p>Unlimited saved hot items</p>
                   `,
        subscruptionDate: result.ebaySubscriptionDate,
        subscriptionDaysleft: result.ebaySubscriptionDaysLeft
      },
      {
        service: 'Amazon scout',
        features: `<p>Unlimited Amazon best items search</p>
                   <p>Unlimited saved hot items</p>
                   <p>Amazon top 100 by categoty</p>
                   <p>Sales per date estimator</p>
                   `,
        subscruptionDate: result.amazonSubscriptionDate,
        subscriptionDaysleft: result.amazonSubscriptionDaysLeft
      }
    ];

    return data;
  }
}

@Injectable()
export class UserLocationResolver implements Resolve<UserLocation> {
  constructor(private userService: UserService) {}
  resolve(route: ActivatedRouteSnapshot) {
    return this.userService.isFullyRegistered();
  }
}
