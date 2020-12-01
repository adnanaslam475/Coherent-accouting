import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TrackingService } from '../../../service/tracking/tracking.service';
import { TrackingStatusMap } from '../../../shared/const/tracking-status.const';
import { TrackingStatus } from '../../../shared/enums/tracking-status.enum';
import { Tracking, TrackingSavedList } from '../../../shared/interfaces/tracking';

@Component({
  selector: 'app-tracking-list',
  templateUrl: './tracking-list.component.html',
  styleUrls: ['./tracking-list.component.scss']
})
export class TrackingListComponent implements OnInit {
  public trackingList: TrackingSavedList;
  public carrier = 'usps';
  public page = 1;
  public pageSize = 20;
  public isLoaded = false;
  public deleted: any;
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

    this.route.paramMap.subscribe(params => {
      this.carrier = params.get('carrier');
      this.getTrackingList(this.page, this.pageSize);
    });
  }

  public getTrackingList(page: number, pageSize: number): void {
    this.trackingService.getTrackingList(this.page, this.pageSize, this.carrier).subscribe(response => {
      this.trackingList = response;
      // this.ngxUiLoader.stop('tracking-list');
      this.isLoaded = true;
    });
  }

  public pageChanged(event: any): void {
    // this.ngxUiLoader.start('tracking-list');
    this.isLoaded = false;
    this.pageSize = event.itemsPerPage;
    this.page = event.page;
    this.getTrackingList(this.page, this.pageSize);
  }

  public onPageSizeChange(event: any): void {
    // this.ngxUiLoader.stop('tracking-list');
    this.isLoaded = false;
    this.page = 1;
    this.getTrackingList(this.page, this.pageSize);
  }

  public deleteTrackingNumber(trackingNumber: Tracking) {
    this.trackingService.deleteTrackingNumber(trackingNumber.id).subscribe(
      respone => (this.deleted = respone),
      error => {},
      () => {
        this.getTrackingList(this.page, this.pageSize);
        this.toastrService.success(trackingNumber.trackingNumber + ' deleted successful!!');
      }
    );
  }
}
