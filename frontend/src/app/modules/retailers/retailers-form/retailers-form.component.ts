import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { saveAs } from 'file-saver/FileSaver';
import 'rxjs/add/operator/toPromise';
import { RetailersService } from '../../../service/retailers/retailers.service';
import { Retailer, SearchRetailersParams } from '../../../shared/interfaces/retailers';

@Component({
  selector: 'app-retailers-form',
  templateUrl: './retailers-form.component.html',
  styleUrls: ['./retailers-form.component.scss']
})
export class RetailersFormComponent implements OnInit {
  @Output() searchRetailersParams: SearchRetailersParams;
  public retailerFrom: FormGroup;
  public isFormSubmited = false;
  public defaultRetailersForm: SearchRetailersParams = {
    searchWord: '',
    minFeedback: null,
    maxFeedback: null,
    minActiveListings: null,
    maxActiveListings: null,
    pageNumber: null,
    topRated: null
  };

  constructor(private formBuilder: FormBuilder, private retailerService: RetailersService) { }

  ngOnInit() {
    this.initForm();
  }

  public searchRetailers(searchParams: FormGroup) {
    if (searchParams.valid) {
      this.searchRetailersParams = searchParams.value;
      this.isFormSubmited = true;
    }
  }

  public initForm(): void {
    this.retailerFrom = this.formBuilder.group({
      searchWord: [this.defaultRetailersForm.searchWord, Validators.compose([Validators.required])],
      minFeedback: [this.defaultRetailersForm.minFeedback],
      maxFeedback: [this.defaultRetailersForm.maxFeedback],
      minActiveListings: [this.defaultRetailersForm.minActiveListings],
      maxActiveListings: [this.defaultRetailersForm.maxActiveListings]
    });
  }

  public exportToTxt(): void {
    this.retailerService.exportToTxt().subscribe(res => {
      this.saveToFileSystem(res);
    });
  }

  public exportToXls(): void {
    this.retailerService.exportToXls().subscribe(res => {
      this.saveToFileSystem(res);
    });
  }

  private saveToFileSystem(response: Blob) {
    const blob = new Blob([response], { type: response.type });
    saveAs(blob, 'sample_file');
  }
}
