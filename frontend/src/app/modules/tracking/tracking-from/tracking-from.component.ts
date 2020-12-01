import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchTrackingParams } from '../../../shared/interfaces/tracking';

@Component({
  selector: 'app-tracking-from',
  templateUrl: './tracking-from.component.html',
  styleUrls: ['./tracking-from.component.scss']
})
export class TrackingFromComponent implements OnInit {
  public trackingForm: FormGroup;
  public searchItemsParams: SearchTrackingParams;
  public isFormSubmited: boolean;
  public readOnly: boolean;
  public defaultTrackingForm: SearchTrackingParams = {
    trackingNumber: null,
    provider: 'USPS'
  };

  constructor(private formBuilder: FormBuilder) {
    this.isFormSubmited = false;
    this.readOnly = false;
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public searchTracking(searchParams: FormGroup): void {
    if (searchParams.valid) {
      this.isFormSubmited = true;
      this.readOnly = true;
      this.searchItemsParams = searchParams.value;
    }
  }

  public initForm(): void {
    this.trackingForm = this.formBuilder.group({
      trackingNumber: [this.defaultTrackingForm.trackingNumber, 
        Validators.compose([Validators.required, Validators.pattern('(^9[0-9]{21})$|^[0-9]{15}$|^[0-9]{12}$')])],
      provider: [this.defaultTrackingForm.provider]
    });
  }
  
}
