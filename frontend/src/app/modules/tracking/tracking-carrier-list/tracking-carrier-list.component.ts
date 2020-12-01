import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TrackingService } from '../../../service/tracking/tracking.service';
import { TrackingStatusMap } from '../../../shared/const/tracking-status.const';
import { TrackingStatus } from '../../../shared/enums/tracking-status.enum';
import { Tracking, TrackingSavedList, SearchTrackingParamsByCarrier } from '../../../shared/interfaces/tracking';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tracking-carrier-list',
  templateUrl: './tracking-carrier-list.component.html',
  styleUrls: ['./tracking-carrier-list.component.scss']
})
export class TrackingCarrierListComponent implements OnInit {
  @Input('searchTrackingParamsByCarrier') public searchTrackingParamsByCarrier: SearchTrackingParamsByCarrier;
  public trackingList: TrackingSavedList;
//   public carrier = 'usps';
  public page = 1;
  public pageSize = 20;
  public isLoaded = false;
  public paginationMaxSize = 5;
  public trackingStatusList: any;
  public trackingStatus: any = TrackingStatus;

  constructor(private trackingService: TrackingService, private toastrService: ToastrService, private ngxUiLoader: NgxUiLoaderService,
              private route: ActivatedRoute) {
    this.trackingStatusList = TrackingStatusMap;
  }

  public ngOnInit() {
    // this.ngxUiLoader.start('tracking-list');
    // this.getTrackingList(this.page, this.pageSize);
    this.trackingService.searchTrackingByCarrier(this.page, this.pageSize, this.searchTrackingParamsByCarrier).subscribe(response => {
        this.trackingList = response;
        // this.ngxUiLoader.stop('tracking-list');
        this.isLoaded = true;
      });
    // this.route.paramMap.subscribe(params => {
    //   this.carrier = params.get('carrier');
    //   this.getTrackingList(this.page, this.pageSize);
    // });
  }

  public ngOnChanges(value: any): void {
    this.searchTrackingParamsByCarrier = value.searchTrackingParamsByCarrier.currentValue;

    if (!this.searchTrackingParamsByCarrier) {

        this.trackingService.searchTrackingByCarrier(this.page, this.pageSize, this.searchTrackingParamsByCarrier).subscribe(response => {
            this.trackingList = response;
            // this.ngxUiLoader.stop('tracking-list');
            this.isLoaded = true;
          });


    //   this.trackingService.searchTrackingByCarrier(this.page, this.pageSize, this.searchTrackingParamsByCarrier).subscribe(
    //     res => {
    //       // this.ngxService.stop('three-strings');
    //       this.trackingList = res;
    //       // const getList = res.true[Object.keys(res.true)[0]];
    //     //   if (res) {
    //         // this.trackingList = res
    //     //   } else {
    //         // this.errorMessage = Object.keys(res.false)[0];
    //     //   }
    //     },
    //     (err: HttpErrorResponse) => {
    //       if (err.error && err.error.false) {
    //         // this.ngxService.stop('three-strings');
    //         this.hideSpinner = true;
    //         this.toastrService.error(Object.keys(err.error.false)[0]);
    //       }
    //     },
    //     () => {
    //       if (this.trackingList) {
    //         // this.ngxService.stop('three-strings');
    //         this.hideSpinner = true;
    //       }
    //     }
    //   );
    }
  }

  public getTrackingListByCarrier(page: number, pageSize: number): void {
    this.trackingService.searchTrackingByCarrier(this.page, this.pageSize, this.searchTrackingParamsByCarrier).subscribe(response => {
      this.trackingList = response;
      this.isLoaded = true;
    });
  }

  public pageChanged(event: any): void {
    this.isLoaded = false;
    this.pageSize = event.itemsPerPage;
    this.page = event.page;
    this.getTrackingListByCarrier(this.page, this.pageSize);
  }

  public onPageSizeChange(event: any): void {
    this.isLoaded = false;
    this.page = 1;
    this.getTrackingListByCarrier(this.page, this.pageSize);
  }

}
