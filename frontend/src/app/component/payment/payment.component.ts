import { Component, OnInit } from '@angular/core';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
import { PaymentService } from '../../service/payment/payment.service';
import { MakePayment } from '../../shared/interfaces/make-payment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public make: MakePayment;
  public payPalConfig?: PayPalConfig;
  public ONE_MONTH = 9.99;
  public THREE_MONTH = 24.99;
  public SIX_MONTH = 49.99;
  public oneMonths = 1;
  public threeMonths = 3;
  public sixMonths = 6;
  public loading: boolean;
  constructor(private paymetService: PaymentService) {
    this.loading = false;
  }

  ngOnInit() {
    // this.sum = Object.keys(this.sum).filter(Number);
  }

  public makePayment(price: number, months: number) {
    this.loading = true;
    this.paymetService.makePayment(price, months).subscribe(v => {
      window.location.href = v.redirect_url;
    });
  }
}
