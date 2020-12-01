import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ItemsService } from '../../../service/items/items.service';
import { Category } from '../../../shared/interfaces/categories.interface';

@Component({
  selector: 'app-amazon-category-items-list',
  templateUrl: './amazon-category-items-list.component.html',
  styleUrls: ['./amazon-category-items-list.component.scss']
})
export class AmazonCategoryItemsListComponent implements OnInit {
  public hideSpinner = true;
  public rows: any[];
  public categories: Category[] = [];
  public subCategories: Category[] = [];
  public subSubCategories: Category[] = [];
  public selectedCategory: Category;
  public selectedSubCategory: Category;
  public selectedSubSubCategory: Category;
  private _lastSelectedCategory: Category;

  constructor(private itemsService: ItemsService, private ngxUiLoader: NgxUiLoaderService) {
    this.hideSpinner = false;
  }

  ngOnInit() {
    this.retrieveCategories();
  }

  retrieveCategories() {
    this.itemsService.getCategories().subscribe(
      (categories: Category[]) => {
        this.selectedCategory = categories[0];
        this.categories = categories;
        this.retrieveSubCategories(this.selectedCategory.category);
      },
      () => {
        this.hideSpinner = true;
        this.ngxUiLoader.stop('amazon-category');
      }
    );
  }

  retrieveItemsData() {
    this.rows = [];
    if (this.isCategorySelected(this.selectedSubSubCategory)) {
      this.hideSpinner = false;
      this._lastSelectedCategory = this.selectedSubSubCategory;
      this.retrieveItems(this.selectedSubSubCategory.url, this.selectedSubSubCategory.category);
      return;
    }

    if (this.isCategorySelected(this.selectedSubCategory)) {
      this.hideSpinner = false;
      this._lastSelectedCategory = this.selectedSubCategory;
      this.retrieveItems(this.selectedSubCategory.url, this.selectedSubCategory.category);
      return;
    }

    if (this.isCategorySelected(this.selectedCategory)) {
      this.hideSpinner = false;
      this._lastSelectedCategory = this.selectedCategory;
      this.retrieveItems(this.selectedCategory.url, this.selectedCategory.category);
      return;
    }
  }

  private retrieveItems(url: string, category: string, page?: string) {
    this.hideSpinner = false;
    this.ngxUiLoader.start('amazon-category');
    this.itemsService.getTopItemsByCategory(url, category, page ? page : '1').subscribe(
      (items: any) => {
        this.hideSpinner = true;
        const rowItems = [];
        const chunks = 4;

        while (items.length > 0) {
          rowItems.push(items.splice(0, chunks));
        }
        this.rows = rowItems;
        this.ngxUiLoader.stop('amazon-category');
      },
      () => {
        this.hideSpinner = true;
      }
    );
  }

  public retrieveSubCategories(category: string) {
    if (category === 'default') {
      return;
    }
    this.itemsService.getSubCategories(category).subscribe(
      (categories: any) => {
        this.hideSpinner = true;
        categories.unshift({ category: 'default', name: '' });
        this.subCategories = categories;
        this.selectedSubCategory = this.subCategories[0];
        this.subSubCategories = [];
      },
      () => {
        this.hideSpinner = true;
        this.ngxUiLoader.stop('amazon-category');
      }
    );
  }

  public retrieveSubSubCategories(subCategory: string) {
    if (subCategory === 'default') {
      return;
    }
    this.itemsService.getSubSubCategories(this.selectedCategory.category, subCategory).subscribe(
      (categories: any) => {
        this.hideSpinner = true;
        categories.unshift({ category: 'default', name: '' });
        this.subSubCategories = categories;
        this.selectedSubSubCategory = this.subSubCategories[0];
      },
      () => {
        this.hideSpinner = true;
        this.ngxUiLoader.stop('amazon-category');
      }
    );
  }

  private isCategorySelected(category: Category): boolean {
    return category && category.category && category.category !== 'default';
  }

  public pageChanged(event: any): void {
    this.retrieveItems(this._lastSelectedCategory.url, this._lastSelectedCategory.category, event.page);
  }
}
