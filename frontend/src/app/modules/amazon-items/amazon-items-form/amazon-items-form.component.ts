import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AmazonItemsService } from '../../../service/amazon-items/amazon-items.service';
import { AmazonSearchParams } from '../../../shared/interfaces/amazon-search-params';

@Component({
  selector: 'app-amazon-items-form',
  templateUrl: './amazon-items-form.component.html',
  styleUrls: ['./amazon-items-form.component.scss']
})
export class AmazonItemsFormComponent implements OnInit {
  public color = 'accent';
  public amazonItemForm: FormGroup;
  public lastSelectedValue: string;
  public lastSelectedSlide: any;
  public showSupplierDdl: boolean;
  public amazonSearchParams: AmazonSearchParams;
  public isSubmitted: boolean;
  public defaultItemForm: AmazonSearchParams = {
    category: 'aps',
    priceFrom: 1,
    priceTo: undefined,
    fromBSR: 1,
    toBSR: undefined,
    reviewsFrom: 1,
    reviewsTo: undefined,
    ratingFrom: 1,
    ratingTo: undefined,
    numberOfSellersFrom: 1,
    numberOfSellersTo: undefined,
    source: 'walmart',
    keyWord: '',
    checkSource: false,
    pageNumber: 1
  };

  constructor(private formBuilder: FormBuilder, private amazonService: AmazonItemsService, private router: Router) {
  }

  ngOnInit() {
    this.amazonItemForm = this.initForm();
    this.showSupplierDdl = false;
    this.isSubmitted = false;
  }

  initForm() {
    return this.formBuilder.group({
      category: [this.defaultItemForm.category],
      priceFrom: [this.defaultItemForm.priceFrom],
      priceTo: [this.defaultItemForm.priceTo],
      fromBSR: [this.defaultItemForm.fromBSR],
      toBSR: [this.defaultItemForm.toBSR],
      reviewsFrom: [this.defaultItemForm.ratingFrom],
      reviewsTo: [this.defaultItemForm.reviewsTo],
      ratingFrom: [this.defaultItemForm.ratingFrom, Validators.compose([Validators.min(1), Validators.max(5)])],
      ratingTo: [this.defaultItemForm.ratingTo, Validators.compose([Validators.min(1), Validators.max(5)])],
      numberOfSellersFrom: [this.defaultItemForm.numberOfSellersFrom],
      numberOfSellersTo: [this.defaultItemForm.numberOfSellersTo],
      source: [this.defaultItemForm.source],
      keyWord: [this.defaultItemForm.keyWord, Validators.required],
      checkSource: [this.defaultItemForm.checkSource],
      pageNumber: [this.defaultItemForm.pageNumber]
    });
  }

  public slideChecked(slide, value) {
    if (this.lastSelectedValue !== value) {
      // if the categories have changed and the previous category is checked
      // uncheck it
      if (this.lastSelectedSlide && this.lastSelectedSlide.checked) {
        this.lastSelectedSlide.source.toggle();
      }
      this.amazonItemForm.patchValue({
        category: value
      });
    }
    this.lastSelectedValue = value;
    this.lastSelectedSlide = slide;
  }

  public supplierChecked(event) {
    this.showSupplierDdl = event.source.checked;
    this.amazonItemForm.patchValue({
      checkSource: this.showSupplierDdl
    });
  }

  public submit(form) {
    if (form.valid) {
      this.amazonService.connect().subscribe(() => {
        this.amazonSearchParams = form.value;
        this.isSubmitted = true;
        // const test = this.amazonService.searchAmazonItems(form.value);
        console.log(form.value);
      });
    }
  }
  
  public resetForm() {
    this.amazonItemForm = this.initForm();
    this.isSubmitted = !this.isSubmitted;
  }
}
