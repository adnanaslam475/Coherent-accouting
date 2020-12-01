import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { ItemsService } from 'app/service/items/items.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDiagramComponent } from '../../../shared/components/modal-diagram/modal-diagram.component';
import { ModalDialogComponent } from '../../../shared/components/modal-dialog/modal-dialog.component';
import { BestMatch, Item, Orders, SearchItemsParams } from '../../../shared/interfaces/items.interface';
import { orderBy } from 'lodash';

@Component({
  selector: 'app-items-search-list-supplier',
  templateUrl: './items-search-list-supplier.component.html',
  styleUrls: ['./items-search-list-supplier.component.scss']
})
export class ItemsSearchListSupplierComponent implements OnDestroy, OnInit {
  @Input() public searchItemsListParam: SearchItemsParams;
  @Input() public isSupplierChecked: boolean;
  public itemsList: Item[];
  public getItems: Item[];
  public isLoaded: boolean;
  public hideSpinner: boolean;
  private num: number;
  private msgError: any;
  public savedItem: Item;
  public totalPrice: number;
  public avgPrice: number;
  public paginationMaxSize = 3;
  public totalItems: number;
  public pageSize: number;
  public sortField: string = 'searchTimesSold';
  public sortOrder: string = 'desc';

  constructor(private itemsService: ItemsService, private toastrService: ToastrService, private router: Router, public dialog: MatDialog) {
    this.itemsList = [];
    this.isLoaded = false;
    this.hideSpinner = false;
    this.num = 0;
  }

  ngOnInit() {
    this.searchItemsListParam.pageNumber = 1;
    this.pageSize = 50;
    this.totalItems = 150;
    this.itemsList = [];
    this.isLoaded = false;
    this.totalPrice = 0;
    this.avgPrice = 0;
    this.searchItems();
  }

  ngOnDestroy() {
    this.disconnectSearch();
  }

  private disconnectSearch() {
    this.itemsService.closeConnection();
    this.itemsService.items.unsubscribe();
  }

  public saveItems(item: Item): void {
    if (item) {
      this.savedItem ? (this.savedItem = this.savedItem) : (this.savedItem = item);
      const newItem: Item = this.setAmazonItem(this.savedItem);
      this.itemsService.saveItem(newItem).subscribe(data => {
        this.toastrService.success('Item has been saved successfully!!');
        this.savedItem = null;
        const index = this.itemsList.indexOf(item, 0);
        if (index > -1) {
          this.itemsList.splice(index, 1);
        }
      });
    }
  }
  public deleteItem(item: Item): void {
    const index = this.itemsList.indexOf(item, 0);
    if (index > -1) {
      this.itemsList.splice(index, 1);
    }
  }

  public openMoreDetails(item: Item): void {
    this.savedItem = item;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '45vw';
    dialogConfig.data = {
      amazonList: item.amazonEntities,
      item
    };

    const dialogRef: MatDialogRef<ModalDialogComponent> = this.dialog.open(ModalDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: { bestMatch: BestMatch; amazonEntities: BestMatch[] }) => {
      if (this.savedItem && result) {
        this.savedItem.bestMatch = result.bestMatch;
        this.savedItem.amazonEntities = result.amazonEntities;
        item.isSavedNewItem = true;
        this.itemsService.calculateProfit(this.savedItem).subscribe(profit => {
          if (profit) {
            this.savedItem.profit = profit;
          }
        });
      }
    });
  }

  public openOrders(orders: string): void {
    const ordersList: Orders[] = JSON.parse(orders);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    if (orders) {
      dialogConfig.data = {
        orders: ordersList
      };
    } else {
      dialogConfig.data = {
        orders: []
      };
    }
    const dialogRef: MatDialogRef<ModalDiagramComponent> = this.dialog.open(ModalDiagramComponent, dialogConfig);
  }

  private setAmazonItem(item: Item): Item {
    const newItem: Item = { ...item };
    if (newItem.bestMatch !== null) {
      newItem.amazonUrl = newItem.bestMatch.amazonUrl;
      newItem.amazonPicture = newItem.bestMatch.amazonPicture;
      newItem.amazonTitle = newItem.bestMatch.amazonTitle;
      newItem.amazonPrice = newItem.bestMatch.amazonPrice;
      newItem.addOn = newItem.bestMatch.addOn;
      newItem.prime = newItem.bestMatch.prime;
      newItem.asin = newItem.bestMatch.asin;

      delete newItem.amazonEntities;
      delete newItem.bestMatch;
    }
    return newItem;
  }

  private calculatePrice(items: any) {
    this.totalPrice = 0;
    if (items && items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        this.totalPrice += +items[i].price;
      }
      this.avgPrice = this.totalPrice / items.length;
    }
  }

  private searchItems() {
    this.itemsService.connect().subscribe(() => {
      if (this.searchItemsListParam) {
        this.itemsService.searchItemsMessage(this.searchItemsListParam);
      }
      this.subscribeItems();
    });
  }

  private subscribeItems() {
    this.itemsService.items.subscribe(
      items => {
        if (!this.isLoaded) {
          this.isLoaded = true;
        }
        this.itemsList.push(items);
        this.calculatePrice(this.itemsList);
        this.sortItems();
      },
      () => {},
      () => {
        this.hideSpinner = true;
      }
    );
  }

  public pageChanged(event: any): void {
    this.disconnectSearch();
    this.searchItemsListParam.pageNumber = event.page;
    this.itemsList = [];
    this.totalPrice = 0;
    this.avgPrice = 0;
    this.hideSpinner = false;
    this.searchItems();
  }

  private sortItems() {
    this.itemsList = orderBy(this.itemsList, this.sortField, this.sortOrder);
  }

  public onSortFieldChange(sortField: string): void {
    this.sortField = sortField;
    this.sortItems();
  }

  public onSortOrderChange(sortOrder: string): void {
    this.sortOrder = sortOrder;
    this.sortItems();
  }
}
