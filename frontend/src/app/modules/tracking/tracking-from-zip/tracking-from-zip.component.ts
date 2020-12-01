import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchTrackingParamsByZip } from '../../../shared/interfaces/tracking';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tracking-from-zip',
  templateUrl: './tracking-from-zip.component.html',
  styleUrls: ['./tracking-from-zip.component.scss']
})
export class TrackingFromZipComponent implements OnInit  {
  public trackingFormByZip: FormGroup;
  public searchTrackingParamsByZip: SearchTrackingParamsByZip;
  public isFormSubmited: boolean;
  public readOnly: boolean;
  public defaultTrackingForm: SearchTrackingParamsByZip = {
    dateRangeFrom: '',
    dateRangeTo: '',
    country: 'us',
    zipCode: ''
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

  public searchTrackingByZip(searchParams: FormGroup): void {
    if (searchParams.valid) {
      this.isFormSubmited = true;
      // this.readOnly = true;
      this.searchTrackingParamsByZip = this.buildRequest(searchParams.value);
    }
  }

  private buildRequest(formValues: any):  SearchTrackingParamsByZip {
    var datePipe = new DatePipe('en-US');
    //Date dateformValues.dateRangeFrom = formValues.dateRangeFrom.getDate() - 3;
    let request = {
      dateRangeFrom: datePipe.transform(formValues.dateRangeFrom,'MM/dd/yyyy'),
      dateRangeTo: datePipe.transform(formValues.dateRangeTo,'MM/dd/yyyy'),
      country: formValues.country,
      zipCode: formValues.zipCode
  }
    return request;
  }

  public initForm(): void {
    this.trackingFormByZip = this.formBuilder.group({
      dateRangeFrom: [this.createYesterdayPlusOne() , Validators.compose([Validators.required])],
      dateRangeTo: [this.createYesterday(), Validators.compose([Validators.required])],
      country: [this.defaultTrackingForm.country, Validators.compose([Validators.required])],
      zipCode: [this.defaultTrackingForm.zipCode, [Validators.required, Validators.pattern('^[0-9]{5}$')]]
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
