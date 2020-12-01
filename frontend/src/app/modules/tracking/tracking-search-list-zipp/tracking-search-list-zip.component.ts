import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TrackingService } from '../../../service/tracking/tracking.service';
import { TrackingStatusMap } from '../../../shared/const/tracking-status.const';
import { TrackingStatus } from '../../../shared/enums/tracking-status.enum';
import { Tracking, SearchTrackingParamsByZip } from '../../../shared/interfaces/tracking';

@Component({
  selector: 'app-tracking-search-list-zip',
  templateUrl: './tracking-search-list-zip.component.html',
  styleUrls: ['./tracking-search-list-zip.component.scss']
})
export class TrackingSearchListZipComponent implements OnChanges, OnInit {
  @Input('searchTrackingParamsByZip') public searchTrackingParamsByZip: SearchTrackingParamsByZip;
  public trackingStatus: any = TrackingStatus;
  public trackingStatusList: any;
  public trackingList: Tracking[];
  public hideSpinner: boolean;
  public num: number;
  public errorMessage: string;
  constructor(private trackingService: TrackingService, private toastrService: ToastrService, private ngxService: NgxUiLoaderService) {
    this.trackingList = [];
    this.trackingStatusList = TrackingStatusMap;
    this.hideSpinner = false;
    this.num = 0;
    this.errorMessage = undefined;
  }

  public ngOnInit(): void {
    // this.ngxService.start('three-strings');
  }

  public ngOnChanges(value: any): void {
    this.searchTrackingParamsByZip = value.searchTrackingParamsByZip.currentValue;

    if (this.searchTrackingParamsByZip) {
      this.trackingService.searchTrackingByZip(this.searchTrackingParamsByZip).subscribe(
        res => {
          // this.ngxService.stop('three-strings');
          this.hideSpinner = true;
          // const getList = res.true[Object.keys(res.true)[0]];
          if (res && res.true) {
            this.trackingList = res.true[Object.keys(res.true)[0]];
          } else {
            this.errorMessage = Object.keys(res.false)[0];
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error && err.error.false) {
            // this.ngxService.stop('three-strings');
            this.hideSpinner = true;
            this.toastrService.error(Object.keys(err.error.false)[0]);
          }
        },
        () => {
          if (this.trackingList) {
            this.ngxService.stop('three-strings');
            this.hideSpinner = true;
          }
        }
      );
    }
  }

  public expandDetails(tracking: Tracking): void {
    this.trackingService.getTrackingDetails(tracking.trackingNumber)
    .subscribe(newItem => {
    let updateItem = this.trackingList.find(this.findIndexToUpdate, newItem.trackingNumber);
    let index = this.trackingList.indexOf(updateItem);
    this.trackingList[index] = newItem;
    });
  }

  findIndexToUpdate (newItem) { 
    return newItem.trackingNumber === this;
}

  public saveTracking(tracking: Tracking): void {
    this.trackingService.saveTrackingNumber(tracking).subscribe(response => {
      this.toastrService.success('Tracking number has been saved successfully!!');
      const index = this.trackingList.indexOf(tracking, 0);
      if (index > -1) {
        this.trackingList.splice(index, 1);
      }
    });
  }

  public deleteTrackingNumber(tracking: Tracking) {
    const index = this.trackingList.indexOf(tracking, 0);
    if (index > -1) {
      this.trackingList.splice(index, 1);
    }
  }
}
