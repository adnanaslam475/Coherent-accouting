import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs/Rx';
import { MakePayment, PaymentResponseInterface } from '../../shared/interfaces/make-payment';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Plans, Payment } from 'app/shared/interfaces/plans';

@Injectable()
export class PaymentService {
  constructor(private apiService: ApiService, private config: ConfigService) { }

  makePayment(sum, months): Observable<MakePayment> {
    return this.apiService.post(this.config.makePayment + sum + '&months=' + months, {});
  }

  completePayment(paymentId, payerId, months) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const body = new FormData();
    body.append('paymentId', paymentId);
    body.append('PayerID', payerId);
    body.append('months', months);
    return this.apiService.post(this.config.completePayment, body, headers);
  }

  makeSubscriptionPayment(plan: Plans): Observable<PaymentResponseInterface> {
    return this.apiService.post(this.config.paySubscriptionUrl, plan);
  }

  completeSubscriptionPayment(paymentInfo: Payment): Observable<any> {
    return this.apiService.post(this.config.paymantAllUrl, paymentInfo);
  }
}
