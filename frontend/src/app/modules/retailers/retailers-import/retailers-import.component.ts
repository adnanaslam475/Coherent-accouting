import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { saveAs } from 'file-saver/FileSaver';
import { ToastrService } from 'ngx-toastr';
import { RetailersService } from '../../../service/retailers/retailers.service';
import { Retailer } from '../../../shared/interfaces/retailers';

@Component({
  selector: 'app-retailers-import',
  templateUrl: './retailers-import.component.html',
  styleUrls: ['./retailers-import.component.scss']
})
export class RetailersImportComponent implements OnInit {
  public sellerForm: FormGroup;
  public defaultSellerFrom: Retailer = {
    retailerUsername: '',
    url: '',
    feedbackScore: 0,
    sellerListings: 0,
    topRated: true,
    sellThroughRate: 0,
    searchedDaysAgo: null,
    countryName: 'United States',
    countryISOCode: 'US'
  };

  constructor(private retailersService: RetailersService, private formBuilder: FormBuilder, private toastrService: ToastrService) { }

  ngOnInit() {
    this.sellerForm = this.initForm();
  }

  public initForm(): FormGroup {
    return this.formBuilder.group({
      retailerUsername: [this.defaultSellerFrom.retailerUsername, Validators.compose([Validators.required])],
      feedbackScore: [this.defaultSellerFrom.feedbackScore, Validators.compose([Validators.required])],
      sellerListings: [this.defaultSellerFrom.sellerListings, Validators.compose([Validators.required])],
      url: [this.defaultSellerFrom.url],
      topRated: [this.defaultSellerFrom.topRated],
      sellThroughRate: [this.defaultSellerFrom.sellThroughRate],
      searchedDaysAgo: [this.defaultSellerFrom.searchedDaysAgo],
      countryName: [this.defaultSellerFrom.countryName],
      countryISOCode: [this.defaultSellerFrom.countryISOCode]
    });
  }

  public exportToTxt(): void {
    this.retailersService.exportToTxt().subscribe(res => {
      this.saveToFileSystem(res);
    });
  }

  public exportToXls(): void {
    this.retailersService.exportToXls().subscribe(res => {
      this.saveToFileSystem(res);
    });
  }

  public createSeller(form: FormGroup): void {
    if(form.valid) {
    this.sellerForm.patchValue({
      url: 'http://www.ebay.com/usr/' + form.value.retailerUsername
    });
    this.retailersService.saveRetailer(form.value).subscribe(respone => {
      this.toastrService.success('Item has been saved successfully!!');
      this.sellerForm.reset(this.defaultSellerFrom);
      this.resetForm();
    });
   }
  }

  private resetForm() {
    this.sellerForm.markAsPristine();
    this.sellerForm.markAsUntouched();
    this.sellerForm.updateValueAndValidity();
  }

  private saveToFileSystem(response: Blob) {
    const blob = new Blob([response], { type: response.type });
    saveAs(blob, 'sample_file');
  }
}
