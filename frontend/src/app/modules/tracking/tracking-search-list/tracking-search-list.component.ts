import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TrackingService } from '../../../service/tracking/tracking.service';
import { TrackingStatusMap } from '../../../shared/const/tracking-status.const';
import { TrackingStatus } from '../../../shared/enums/tracking-status.enum';
import { SearchTrackingParams, Tracking } from '../../../shared/interfaces/tracking';

@Component({
  selector: 'app-tracking-search-list',
  templateUrl: './tracking-search-list.component.html',
  styleUrls: ['./tracking-search-list.component.scss']
})
export class TrackingSearchListComponent implements OnChanges, OnInit {
  @Input('searchTrackingParams') public searchTrackingParams: SearchTrackingParams;
  public trackingStatus: any = TrackingStatus;
  public trackingStatusList: any;
  public trackingList: Tracking[];
  public hideSpinner: boolean;
  public num: number;
  constructor(private trackingService: TrackingService, private toastrService: ToastrService, private ngxService: NgxUiLoaderService) {
    this.trackingList = [];
    this.trackingStatusList = TrackingStatusMap;
    this.hideSpinner = false;
    this.num = 0;
  }

  public ngOnInit(): void {
    // this.ngxService.start('three-strings');
  }

  public ngOnChanges(value: any): void {
    this.searchTrackingParams = value.searchTrackingParams.currentValue;

    if (this.searchTrackingParams) {
      this.trackingService.searchTracking(this.searchTrackingParams).subscribe(
        res => {
          // this.ngxService.stop('three-strings');
          this.hideSpinner = true;
          const getList = res.true[Object.keys(res.true)[0]];
          if (res && res.true && getList) {
            this.trackingList = getList;
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
