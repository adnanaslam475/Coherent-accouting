import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RetailersService } from '../../../service/retailers/retailers.service';
import { Retailer, SearchRetailersParams } from '../../../shared/interfaces/retailers';

@Component({
  selector: 'app-retailers-search-list',
  templateUrl: './retailers-search-list.component.html',
  styleUrls: ['./retailers-search-list.component.scss']
})
export class RetailersSearchListComponent implements OnInit, OnDestroy {

  @Input() searchRetailersParams: SearchRetailersParams;
  public retailers: Retailer[] = [];
  public isLoaded = false;
  public hideSpinner = false;
  errorMessage: string;

  constructor(private retailersService: RetailersService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.searchRetailers(this.searchRetailersParams);
  }

  ngOnDestroy() {
    this.disconnectSearch();
  }

  private disconnectSearch() {
    this.retailersService.closeConnection();
    this.retailersService.retailers.unsubscribe();
  }

  searchRetailers(searchParams: SearchRetailersParams) {
    this.retailersService.connect().subscribe(() => {
      this.retailersService.retailers.subscribe(items => {
          this.retailers.push(items);
          this.retailers = this.removeDuplicates(this.retailers);
        }, () => {

        }, () => {
          this.hideSpinner = true;
        }
      );
      this.retailersService.searchRetailers(searchParams);
    });
  }

  saveRetailer(retailer: Retailer) {
    this.retailersService.saveRetailer(retailer).subscribe(respone => {
      this.toastrService.success('Item has been saved successfully!!');
      const index = this.retailers.indexOf(retailer, 0);
      if (index > -1) {
        this.retailers.splice(index, 1);
      }
    });
  }

  public deleteRetailer(retailer: Retailer) {
    const index = this.retailers.indexOf(retailer, 0);
    if (index > -1) {
      this.retailers.splice(index, 1);
    }
  }

  public removeDuplicates(myArr) {
    const filteredArray = myArr.filter((obj, index, self) => {
      return (
        index ===
        self.findIndex(t => {
          return t.retailerUsername === obj.retailerUsername;
        })
      );
    });
    return filteredArray;
  }
}
