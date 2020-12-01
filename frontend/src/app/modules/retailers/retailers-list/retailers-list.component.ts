import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { RetailersSavedList, Retailer } from '../../../shared/interfaces/retailers';
import { RetailersService } from '../../../service/retailers/retailers.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-retailers-list',
  templateUrl: './retailers-list.component.html',
  styleUrls: ['./retailers-list.component.scss']
})
export class RetailersListComponent implements OnInit {

  public retailersSaved: RetailersSavedList;
  public errorMessage: string;
  public deleted: any;
  public isLoaded = false;
  public pageSize = 20;
  public page = 1;
  public paginationMaxSize = 5;
  public sortField = 'lastSearchDate';
  public direction = 'desc';


  constructor(
    private retailersService: RetailersService,
    private toastrService: ToastrService,
    private router: Router, ) { }

  ngOnInit() {
    this.getListSavedRetailers(this.page, this.pageSize, this.sortField, this.direction);
  }

  private getListSavedRetailers(page: number, pageSize: number, sortField: string, direction: string) {
    this.retailersService
      .getAllSavedRetailers(page, pageSize, sortField, direction)
      .subscribe(
      (respone) => this.retailersSaved = respone,
      (error) => this.errorMessage = <any>error,
      () => {
        this.isLoaded = true;
      });
  }

  public deleteRetailer(retailer: Retailer) {
    this.retailersService
      .deleteRetailer(retailer.id)
      .subscribe(respone => this.deleted = respone,
      (error) => this.toastrService.error(error),
      () => {
        this.getListSavedRetailers(this.page, this.pageSize, this.sortField, this.direction);
        this.toastrService.success(retailer.retailerUsername + ' deleted successful!!');
      });
  }

  public pageChanged(event: any) {
    this.isLoaded = false;
    this.pageSize = event.itemsPerPage;
    this.page = event.page;
    this.getListSavedRetailers(this.page, this.pageSize, this.sortField, this.direction);
  }

  public onPageSizeChange(event: any) {
    this.isLoaded = false;
    this.page = 1;
    this.getListSavedRetailers(this.page, this.pageSize, this.sortField, this.direction);
  }

  public onSortFieldChange(event: any) {
    this.sortField = event;
    this.getListSavedRetailers(this.page, this.pageSize, this.sortField, this.direction);
  }

  public onDirectionChange(event: any) {
    this.direction = event;
    this.getListSavedRetailers(this.page, this.pageSize, this.sortField, this.direction);
  }
}
