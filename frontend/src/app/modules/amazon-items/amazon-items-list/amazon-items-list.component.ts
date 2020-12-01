import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { AmazonModalDisplayRankComponent } from 'app/shared/components/amazon-modal-display-rank/amazon-modal-display-rank.component';
import { ToastrService } from 'ngx-toastr';
import { AmazonItemsService } from '../../../service/amazon-items/amazon-items.service';
import { AmazonModalDialogComponent } from '../../../shared/components/amazon-modal-dialog/amazon-modal-dialog.component';
import { AmazonModalRankComponent } from '../../../shared/components/amazon-modal-rank/amazon-modal-rank.component';
import { AmazonEstimate, AmazonItem, AmazonRank, BestMatch } from '../../../shared/interfaces/amazon-items';
import { AmazonSearchParams } from '../../../shared/interfaces/amazon-search-params';

@Component({
  selector: 'app-amazon-items-list',
  templateUrl: './amazon-items-list.component.html',
  styleUrls: ['./amazon-items-list.component.scss']
})
export class AmazonItemsListComponent implements OnInit, OnDestroy {
  @Input() public amazonSearchParams: AmazonSearchParams;
  public amazonItems: AmazonItem[];
  public savedItem: AmazonItem;
  public hideSpinner: boolean;
  public page: number;
  public pageSize: number;
  public paginationMaxSize = 5;
  public totalItems: number;

  constructor(private amazonService: AmazonItemsService, private toastrService: ToastrService, public dialog: MatDialog) {}

  public ngOnInit(): void {
    this.amazonItems = [];
    this.hideSpinner = false;
    this.page = 1;
    this.pageSize = 5;
    this.totalItems = 50;
    this.subscribeAmazonItems();
    this.searchAmazonItems();
  }

  public ngOnDestroy(): void {
    this.disconnectSearch();
  }

  private disconnectSearch() {
    this.amazonService.closeConnection();
    this.amazonService.amazonItems.unsubscribe();
  }

  public openMoreDetails(amazonItem: AmazonItem): void {
    this.savedItem = amazonItem;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '45vw';
    dialogConfig.data = {
      amazonList: amazonItem.similarItemsFromSource
    };

    const dialogRef: MatDialogRef<AmazonModalDialogComponent> = this.dialog.open(AmazonModalDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: { data: BestMatch }) => {
      if (this.savedItem && result) {
        this.savedItem.bestMatch = result.data;
        this.amazonService.calculateProfitAmazon(this.savedItem).subscribe(profit => {
          if (profit) {
            this.savedItem.profit = profit;
          }
        });
      }
    });
  }

  public saveItems(item: AmazonItem): void {
    if (item) {
      this.savedItem ? (this.savedItem = this.savedItem) : (this.savedItem = item);
      const newItem: AmazonItem = this.setAmazonItem(this.savedItem);
      this.amazonService.saveItem(newItem).subscribe(data => {
        this.toastrService.success('Item has been saved successfully!!');
        this.savedItem = null;
        const index = this.amazonItems.indexOf(item, 0);
        if (index > -1) {
          this.amazonItems.splice(index, 1);
        }
      });
    }
  }

  public deleteItem(item: AmazonItem): void {
    const index = this.amazonItems.indexOf(item, 0);
    if (index > -1) {
      this.amazonItems.splice(index, 1);
    }
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
    // this.page = event.page;
    // this.pageSize = event.itemsPerPage;
    this.disconnectSearch();
    this.amazonSearchParams.pageNumber = event.page;
    this.amazonItems = [];
    this.hideSpinner = false;
    // this.amazonService.closeConnection();
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

  private setAmazonItem(item: AmazonItem): AmazonItem {
    const newItem: AmazonItem = { ...item };
    if (newItem.bestMatch !== null) {
      newItem.sourceUrl = newItem.bestMatch.sourceUrl;
      newItem.sourceImage = newItem.bestMatch.sourceImage;
      newItem.sourceTitle = newItem.bestMatch.sourceTitle;
      newItem.sourcePrice = newItem.bestMatch.sourcePrice;
      // newItem.addOn = newItem.bestMatch.addOn;
      // newItem.prime = newItem.bestMatch.prime;

      delete newItem.similarItemsFromSource;
      delete newItem.bestMatch;
    }
    return newItem;
  }
}
