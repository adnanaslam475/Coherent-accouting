import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { AmazonItemsService } from '../../../service/amazon-items/amazon-items.service';
import { AmazonModalDisplayRankComponent } from '../../../shared/components/amazon-modal-display-rank/amazon-modal-display-rank.component';
import { AmazonModalRankComponent } from '../../../shared/components/amazon-modal-rank/amazon-modal-rank.component';
import { ModalDiagramComponent } from '../../../shared/components/modal-diagram/modal-diagram.component';
import { AmazonEstimate, AmazonItem, AmazonRank } from '../../../shared/interfaces/amazon-items';
import { AmazonSearchParams } from '../../../shared/interfaces/amazon-search-params';
import { Orders } from '../../../shared/interfaces/items.interface';

@Component({
  selector: 'app-amazon-items-list-source',
  templateUrl: './amazon-items-list-source.component.html',
  styleUrls: ['./amazon-items-list-source.component.scss']
})
export class AmazonListPrimeComponent implements OnInit, OnDestroy {
  @Input() public amazonSearchParams: AmazonSearchParams;
  public amazonItems: AmazonItem[];
  public savedItem: AmazonItem;
  public hideSpinner: boolean;
  public page: number;
  public pageSize: number;
  public paginationMaxSize = 5;
  public totalItems: number;

  constructor(private amazonService: AmazonItemsService, public dialog: MatDialog, private toastrService: ToastrService) {
    this.amazonItems = [];
    this.hideSpinner = false;
  }

  ngOnInit() {
    this.page = 1;
    this.pageSize = 5;
    this.totalItems = 50;
    this.subscribeAmazonItems();
    this.searchAmazonItems();
  }

  ngOnDestroy() {
    this.disconnectSearch();
  }

  private disconnectSearch() {
    this.amazonService.closeConnection();
    this.amazonService.amazonItems.unsubscribe();
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

  public openCalculateRankModal(item: AmazonItem) {
    // const ordersList: AmazonRank[] = JSON.parse(itemsRank);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    if (item) {
      dialogConfig.data = {
        amazonRankList: item.amazonRanks
      };
    } else {
      dialogConfig.data = {
        amazonRankList: []
      };
    }
    const dialogRef: MatDialogRef<AmazonModalRankComponent> = this.dialog.open(AmazonModalRankComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: { data: AmazonEstimate }) => {
      if (item && result) {
        item.estimatedSalesCatrgory = result.data.estimatedSalesCatrgory;
        item.estimatedSalesPerDay = result.data.estimatedSalesPerDay;
      }
    });
  }

  public deleteItem(item: AmazonItem): void {
    const index = this.amazonItems.indexOf(item, 0);
    if (index > -1) {
      this.amazonItems.splice(index, 1);
    }
  }

  public saveItems(item: AmazonItem): void {
    if (item) {
      this.amazonService.saveItem(item).subscribe(data => {
        this.toastrService.success('Item has been saved successfully!!');
        this.savedItem = null;
        const index = this.amazonItems.indexOf(item, 0);
        if (index > -1) {
          this.amazonItems.splice(index, 1);
        }
      });
    }
  }

  public openRankModal(ranks: AmazonRank) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    if (ranks) {
      dialogConfig.data = {
        amazonRankList: ranks
      };
    } else {
      dialogConfig.data = {
        amazonRankList: []
      };
    }
    const dialogRef: MatDialogRef<AmazonModalDisplayRankComponent> = this.dialog.open(AmazonModalDisplayRankComponent, dialogConfig);
  }

  public pageChanged(event: any): void {
    this.disconnectSearch();
    this.amazonSearchParams.pageNumber = event.page;
    this.amazonItems = [];
    this.hideSpinner = false;
    this.amazonService.connect().subscribe(() => {
      this.searchAmazonItems();
      this.subscribeAmazonItems();
    });
  }

  private searchAmazonItems() {
    this.amazonService.searchAmazonItemsMessage(this.amazonSearchParams);
  }

  private subscribeAmazonItems() {
    this.amazonService.amazonItems.subscribe(
      items => {
        this.amazonItems.push(items);
      },
      () => {},
      () => {
        this.hideSpinner = true;
      }
    );
  }
}
