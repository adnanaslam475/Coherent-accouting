import { NUMBER_TYPE } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ItemsService } from 'app/service/items/items.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/Subscription';
import { Item, ItemsSavedList, Orders, SearchItemsParams } from '../../../shared/interfaces/items.interface';
import { ModalDiagramComponent } from './../../../shared/components/modal-diagram/modal-diagram.component';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
  private requestSubs: Subscription;
  public savedItems: ItemsSavedList;
  public pageSize: number;
  public page: number;
  public deleted: any;
  public isLoaded: boolean;
  public loadedSpinners: boolean;
  private errorMessage: any;
  public paginationMaxSize = 5;
  public sortField: string;
  public direction: string;

  private selectedAsins: number[] = [];

  constructor(private itemService: ItemsService, private toastrService: ToastrService, public dialog: MatDialog) { }
  public ngOnInit() {
    this.page = 1;
    this.pageSize = 20;
    this.isLoaded = false;
    this.loadedSpinners = false;
    this.sortField = 'saleDate';
    this.direction = 'asc';

    this.getSavedListItem(this.page, this.pageSize, this.sortField, this.direction);
  }

  public getSavedListItem(page: number, pageSize: number, sortField: string, direction: string): void {
    this.itemService.allSavedItems(page, pageSize, sortField, direction).subscribe(
      data => {
        this.loadedSpinners = true;
        this.savedItems = data;
      },
      error => (this.errorMessage = error),
      () => {
        this.loadedSpinners = false;
        this.isLoaded = true;
      }
    );
  }

  public deleteItem(item: Item): void {
    if (item) {
      this.itemService.deleteItem(item.id).subscribe(
        data => (this.deleted = data),
        err => this.toastrService.error(err),
        () => {
          this.getSavedListItem(this.page, this.pageSize, this.sortField, this.direction);
          this.toastrService.success(item.itemTitle + ' deleted Successful!!');
        }
      );
    }
  }

  public pageChanged(event: any): void {
    this.isLoaded = false;
    this.pageSize = event.itemsPerPage;
    this.page = event.page;
    this.getSavedListItem(this.page, this.pageSize, this.sortField, this.direction);
  }

  public onPageSizeChange(event: any): void {
    this.isLoaded = false;
    this.page = 1;
    this.getSavedListItem(this.page, this.pageSize, this.sortField, this.direction);
  }

  public onSortFieldChange(event: any): void {
    this.sortField = event;
    this.getSavedListItem(this.page, this.pageSize, this.sortField, this.direction);
  }

  public onDirectionChange(event: any): void {
    this.direction = event;
    this.getSavedListItem(this.page, this.pageSize, this.sortField, this.direction);
  }

  public openOrders(orders: string): void {
    const ordersList = JSON.parse(orders);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      orders: ordersList
    };

    const dialogRef: MatDialogRef<ModalDiagramComponent> = this.dialog.open(ModalDiagramComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: Orders[]) => { });
  }

  public exportAll() {
    this.itemService.downloadAllAsins().subscribe((response: string) => {
        this.saveToFile("allExported.csv", response);
    });
  }

  public exportSelected() {
    if (this.selectedAsins.length > 0) {
      this.itemService.downloadSelectedAsins(this.selectedAsins).subscribe((response: string) => {
        this.saveToFile("exportSelected.csv", response);
      });
    }
  }

  public addToSelected(event: any, asin: number) {
    if (event.target.checked) {
      this.selectedAsins.push(asin);
    } else {
      const asinIndex = this.selectedAsins.indexOf(asin);
      if (asinIndex !== -1) {
        this.selectedAsins.splice(asinIndex, 1);
      }
    }
  }

  private saveToFile(filename: string, data: string) {
    const blob = new Blob([data], { type: 'text/plain' });
    saveAs(blob, filename);
  }

  public isExportSomeDisabled(): boolean {
    return this.selectedAsins.length === 0;
  }

  public isExportAllDisabled(): boolean {
    return !this.savedItems || !this.savedItems.elements || this.savedItems.elements.length === 0;
  }
}
