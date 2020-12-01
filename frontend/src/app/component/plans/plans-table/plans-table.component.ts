import { Component, Input, OnInit } from '@angular/core';
import { PaymentService } from 'app/service/payment/payment.service';
import { Plans, PlansProperies } from 'app/shared/interfaces/plans';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'plans-table',
  templateUrl: './plans-table.component.html',
  styleUrls: ['./plans-table.component.scss']
})
export class PlansTableComponent implements OnInit {
  @Input()
  public plans: Plans[];
  @Input()
  public plansProperties: PlansProperies[];

  public tableData: any = {
    names: [],
    months: [],
    fees: [],
    ebaySubscriptions: [],
    trackingSubscriptions: [],
    trackingLimits: [],
    amazonSubscriptions: [],
    recommended: []
  };

  constructor(private paymetService: PaymentService, private ngxService: NgxUiLoaderService) {}

  ngOnInit() {
    this.prepareTableData(this.plans, this.plansProperties);
  }

  private prepareTableData(plans: any[], plansProperties: any[]) {
    plans.forEach((plan: any) => {
      this.tableData.names.push(plan.name);
      this.tableData.recommended.push(plan.recommended);
      this.tableData.months.push(plan.months);
      this.tableData.fees.push(plan.fee);
      this.tableData.ebaySubscriptions.push(plan.ebaySubscription);
      this.tableData.trackingSubscriptions.push(plan.trackingSubscription);
      this.tableData.trackingLimits.push(plan.trackingLimit);
      this.tableData.amazonSubscriptions.push(plan.amazonSubscription);
    });

    plansProperties.forEach((propertyDesc: any) => {
      this.tableData[propertyDesc.property] = [];
      plans.forEach((plan: any) => {
        this.tableData[propertyDesc.property].push(plan[propertyDesc.property]);
      });
    });
  }

  public makePayment(index: number) {
    this.ngxService.start('three-strings');
    const plan = this.plans[index];
    this.paymetService.makeSubscriptionPayment(plan).subscribe(v => {
      window.location.href = v.redirectUrl;
    });
  }
}
