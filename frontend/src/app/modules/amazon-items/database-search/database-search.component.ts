import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AmazonItemsService } from '../../../service/amazon-items/amazon-items.service';
import { AmazonCategory, AmazonDatabaseItems, AmazonDatabaseResult } from '../../../shared/interfaces/amazon-items';
import { AMAZON_DATABASE_SEARCH_ITEMS, AMAZON_ITEM_CATEGORIES, AMAZON_SELLER_TYPE } from './database-search.const';

@Component({
  selector: 'app-database-search',
  templateUrl: './database-search.component.html',
  styleUrls: ['./database-search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DatabaseSearchComponent implements OnInit {
  public databaseSearchForm: FormGroup;
  public databaseSearchResult: AmazonDatabaseResult[] = [];
  public page: number;
  // tslint:disable-next-line:max-line-length
  public loadingTemplate = `<img class="spinner-template" src="http://pa1.narvii.com/5722/2c617cd9674417d272084884b61e4bb7dd5f0b15_hq.gif">`;

  constructor(
    private ng4LoadingSpinnerService: Ng4LoadingSpinnerService,
    private amazonService: AmazonItemsService,
    private formBuilder: FormBuilder
  ) {}

  get defaultAmazonDatabaseSearchItems() {
    return AMAZON_DATABASE_SEARCH_ITEMS;
  }

  get categories() {
    return AMAZON_ITEM_CATEGORIES;
  }

  get sellerTypes() {
    return AMAZON_SELLER_TYPE;
  }

  public ngOnInit(): void {
    this.databaseSearchForm = this.initForm();
  }

  public onSubmit(searchItems: AmazonDatabaseItems, loadMore: boolean): void {
    this.ng4LoadingSpinnerService.show();
    const search = { ...searchItems };
    loadMore ? (this.page += 1) : (this.page = 1);
    search.page = this.page;
    search.categories = search.categories['controls'].map(category => category.value);
    this.amazonService.searchAmazonDatabaseItems(search).subscribe(result => {
      loadMore ? (this.databaseSearchResult = [...this.databaseSearchResult, ...result]) : (this.databaseSearchResult = result);
      this.ng4LoadingSpinnerService.hide();
    });
  }

  public onChangeCategories(category: AmazonCategory, isChecked: boolean): void {
    category.selected = !category.selected;
    const categoryFormArray = this.databaseSearchForm.get('categories').value as FormArray;
    const all = categoryFormArray.controls[0];

    // in case everyone are selected
    if (category.value === 'aps') {
      this.clearFormArray(categoryFormArray);
      if (isChecked) {
        categoryFormArray.controls.push(this.formBuilder.control(category.value));
        this.categories.map(c => (c.selected = true));
      } else {
        categoryFormArray.removeAt(0);
        this.categories.map(c => (c.selected = false));
      }
      return;
    }

    if (all && all.value === 'aps') {
      categoryFormArray.removeAt(0);
      this.categories.forEach(c => {
        if (c.value !== 'aps') {
          categoryFormArray.controls.push(this.formBuilder.control(c.value));
        } else {
          c.selected = false;
        }
      });
      return;
    }

    if (isChecked) {
      categoryFormArray.controls.push(this.formBuilder.control(category.value));
    } else {
      const index = categoryFormArray.controls.findIndex(x => x.value === category.value);
      categoryFormArray.removeAt(index);
    }
  }

  private clearFormArray(formArray: FormArray): void {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }
  private sortCategories(): void {
    this.categories
      .sort((a, b) => {
        return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
      })
      .map(category => {
        if (this.defaultAmazonDatabaseSearchItems.categories.indexOf(category.value) !== -1) {
          category.selected = true;
          return category;
        }

        category.selected = false;
        return category;
      });
  }

  private initForm(): FormGroup {
    this.sortCategories();

    return this.formBuilder.group({
      categories: [this.formBuilder.array(this.defaultAmazonDatabaseSearchItems.categories)],
      minPrice: [this.defaultAmazonDatabaseSearchItems.minPrice],
      maxPrice: [this.defaultAmazonDatabaseSearchItems.maxPrice],
      minReviews: [this.defaultAmazonDatabaseSearchItems.minReviews],
      maxReviews: [this.defaultAmazonDatabaseSearchItems.maxReviews],
      minRating: [this.defaultAmazonDatabaseSearchItems.minRating],
      maxRating: [this.defaultAmazonDatabaseSearchItems.maxRating],
      minSalesPerMonth: [this.defaultAmazonDatabaseSearchItems.minSalesPerMonth],
      maxSalesPerMonth: [this.defaultAmazonDatabaseSearchItems.maxSalesPerMonth],
      minRevenuePerMonth: [this.defaultAmazonDatabaseSearchItems.minRevenuePerMonth],
      maxRevenuePerMonth: [this.defaultAmazonDatabaseSearchItems.maxRevenuePerMonth],
      minAmazonSellerRank: [this.defaultAmazonDatabaseSearchItems.minAmazonSellerRank],
      maxAmazonSellerRank: [this.defaultAmazonDatabaseSearchItems.maxAmazonSellerRank],
      minNumberOfSellers: [this.defaultAmazonDatabaseSearchItems.minNumberOfSellers],
      maxNumberOfSellers: [this.defaultAmazonDatabaseSearchItems.maxNumberOfSellers],
      minProfit: [this.defaultAmazonDatabaseSearchItems.minProfit],
      maxProfit: [this.defaultAmazonDatabaseSearchItems.maxProfit],
      minQualityScore: [this.defaultAmazonDatabaseSearchItems.minQualityScore],
      maxQualityScore: [this.defaultAmazonDatabaseSearchItems.maxQualityScore],
      sellerType: [this.defaultAmazonDatabaseSearchItems.sellerType],
      titleKeyword: [this.defaultAmazonDatabaseSearchItems.titleKeyword],
      sortField: [this.defaultAmazonDatabaseSearchItems.sortField],
      direction: [this.defaultAmazonDatabaseSearchItems.direction],
      excludeTitleKeywords: [this.defaultAmazonDatabaseSearchItems.excludeTitleKeywords],
      brand: [this.defaultAmazonDatabaseSearchItems.brand],
      page: [this.defaultAmazonDatabaseSearchItems.page]
    });
  }
}
