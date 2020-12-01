import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../../service/payment/payment.service';
import { UserService } from '../../../service';
import { ValidateSubscription } from '../../../shared/interfaces/validate-subscription';
import { HttpResponse } from '@angular/common/http';
import { Payment } from 'app/shared/interfaces/plans';

@Component({
  selector: 'app-payment-complete',
  templateUrl: './payment-complete.component.html',
  styleUrls: ['./payment-complete.component.scss']
})
export class PaymentCompleteComponent implements OnInit {
  private payment: any;
  public months: number;
  public success: boolean;
  public errorMessage: string;
  public loading: boolean;
  private validateSub: ValidateSubscription;

  constructor(private route: ActivatedRoute, private paymentService: PaymentService, private userService: UserService) {
    this.success = true;
    this.loading = true;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.paySubscription(params);
    });
  }

  public validateSubscription() {
    // this.userService.getSubscriptionDateAll().subscribe(subDays => {
    //   this.userService.setSubscribtionDate(subDays);
    // });
    // this.userService.validateSubscriptionsAll().subscribe();
  }

  private paySubscription(params: any) {
    const paymentInfo: Payment = new Payment();
    paymentInfo.months = params["months"];
    paymentInfo.paymentId = params["paymentId"];
    paymentInfo.payerId = params["PayerID"];
    paymentInfo.ebaySubscription = params["ebay"];
    paymentInfo.amazonSubscription = params["amazon"];
    paymentInfo.trackingLimit = params["trackingLimit"];
    paymentInfo.fee = params["fee"];
    paymentInfo.trackingSubscription = params["tracking"];
    this.paymentService.completeSubscriptionPayment(paymentInfo)
      .subscribe(p => {
        this.months = params["months"];
        this.payment = p;
        this.loading = false;
        this.validateSubscription();
      },
        (error: any) => {
          if (error.status === 500) {
            this.errorMessage = error.error.errorCode;
            this.loading = false;
            this.success = false;
          }
        });
  }
}
