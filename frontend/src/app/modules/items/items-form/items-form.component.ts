import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { SearchItemsParams } from '../../../shared/interfaces/items.interface';
import { User } from '../../../shared/interfaces/user.interface';
@Component({
  selector: 'app-items-form',
  templateUrl: './items-form.component.html',
  styleUrls: ['./items-form.component.scss']
})
export class ItemsFormComponent implements OnInit {
  public disableToggleButton = false;
  public currentUser: User;
  public itemForm: FormGroup;
  public salesDate: number[];
  public isItemFormSubmitted: boolean;
  public searchItemsParams: SearchItemsParams;
  public retailerName: string;
  public supplierIsChecked: boolean;
  public defaultItemForm: SearchItemsParams = {
    pageNumber: 1,
    minItemsSold: '1',
    maxItemsSold: '',
    retailerUserName: '',
    saleDateRange: '20',
    username: '',
    supplier: 'amazon',
    checkSupplier: false
  };

  constructor(private formBuilder: FormBuilder, private routeActive: ActivatedRoute, private userService: UserService) {
    this.salesDate = this.setSalesDateRange();
    this.isItemFormSubmitted = false;
  }

  get isSupplierChecked(): AbstractControl {
    return !this.itemForm.get('checkSupplier').value || this.disableToggleButton ? this.itemForm.get('checkSupplier').value : null;
  }
  public ngOnInit(): void {
    this.routeActive.params.subscribe(params => {
      if (params['retailerUsername']) {
        this.defaultItemForm.retailerUserName = params['retailerUsername'];
      }
    });
    this.userService.getMyInfo().subscribe((user: User) => {
      this.currentUser = user;
    });
    this.itemForm = this.initForm();
  }

  public initForm(): FormGroup {
    return this.formBuilder.group({
      pageNumber: [this.defaultItemForm.pageNumber],
      minItemsSold: [this.defaultItemForm.minItemsSold],
      maxItemsSold: [this.defaultItemForm.maxItemsSold],
      retailerUserName: [this.defaultItemForm.retailerUserName, Validators.compose([Validators.required])],
      saleDateRange: [this.defaultItemForm.saleDateRange],
      supplier: [this.defaultItemForm.supplier],
      checkSupplier: [this.defaultItemForm.checkSupplier]
    });
  }

  public setSalesDateRange(): number[] {
    const salesDateArray: number[] = [];
    const maxNum = 20;
    for (let i = 5; i <= maxNum; i += 5) {
      salesDateArray.push(i);
    }
    salesDateArray.push(30);
    return salesDateArray;
  }

  public submit(form: FormGroup): void {
    if (form.valid) {
      this.isItemFormSubmitted = true;
      this.searchItemsParams = form.value;
      if (this.currentUser) {
        this.searchItemsParams.username = this.currentUser.username;
      }
    }
  }
}
