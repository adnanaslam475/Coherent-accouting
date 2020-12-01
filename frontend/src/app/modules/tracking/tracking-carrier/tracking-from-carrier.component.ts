import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchTrackingParamsByCarrier } from '../../../shared/interfaces/tracking';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tracking-from-carrier',
  templateUrl: './tracking-from-carrier.component.html',
  styleUrls: ['./tracking-from-carrier.component.scss']
})
export class TrackingFromCarrierComponent implements OnInit  {
  public trackingFormByCarrier: FormGroup;
  public searchTrackingParamsByCarrier: SearchTrackingParamsByCarrier;
  public isFormSubmited: boolean;
  public readOnly: boolean;
  public defaultTrackingForm: SearchTrackingParamsByCarrier = {
    shippingDateFrom: '',
    shippingDateTo: '',
    carrier: 'fedex'
  };
  maxDate = new Date();

  constructor(private formBuilder: FormBuilder) {
    this.isFormSubmited = false;
    this.readOnly = false;
  }

  public ngOnInit(): void {
    this.initForm();
    this.maxDate  = this.createYesterday();
  }

  public searchTrackingByCarrier(searchParams: FormGroup): void {
    if (searchParams.valid) {
      this.isFormSubmited = true;
      // this.readOnly = true;
      this.searchTrackingParamsByCarrier = this.buildRequest(searchParams.value);
    }
  }

  private buildRequest(formValues: any):  SearchTrackingParamsByCarrier {
    var datePipe = new DatePipe('en-US');
    //Date dateformValues.dateRangeFrom = formValues.dateRangeFrom.getDate() - 3;
    let request = {
      shippingDateFrom: datePipe.transform(formValues.shippingDateFrom,'MM/dd/yyyy'),
      shippingDateTo: datePipe.transform(formValues.shippingDateTo,'MM/dd/yyyy'),
      carrier: formValues.carrier
  }
    return request;
  }

  public initForm(): void {
    this.trackingFormByCarrier = this.formBuilder.group({
      shippingDateFrom: [this.createYesterdayPlusOne() , Validators.compose([Validators.required])],
      shippingDateTo: [this.createYesterday(), Validators.compose([Validators.required])],
      carrier: [this.defaultTrackingForm.carrier, Validators.compose([Validators.required])]
    });
  }

  private createYesterday(): Date {
    var today = new Date();
    today.setDate(today.getDate() - 1);
    return today;
  }

  private createYesterdayPlusOne(): Date {
    var today = new Date();
    today.setDate(today.getDate() - 2);
    return today;
  }
}
