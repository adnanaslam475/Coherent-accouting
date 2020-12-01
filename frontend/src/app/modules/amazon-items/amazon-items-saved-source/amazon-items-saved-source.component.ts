import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { AmazonItemsService } from '../../../service/amazon-items/amazon-items.service';
import { AmazonModalDisplayRankComponent } from '../../../shared/components/amazon-modal-display-rank/amazon-modal-display-rank.component';
import { AmazonItem, AmazonItemsSavedList, AmazonRank } from '../../../shared/interfaces/amazon-items';

@Component({
  selector: 'app-amazon-items-saved-source',
  templateUrl: './amazon-items-saved-source.component.html',
  styleUrls: ['./amazon-items-saved-source.component.scss']
})
export class AmazonItemsSavedSourceComponent implements OnInit {
  public hideSpinner: boolean;
  public amazonItems: AmazonItemsSavedList;
  public pageSize: number;
  public page: number;
  public deleted: any;
  public isLoaded: boolean;
  public paginationMaxSize = 5;
  public sortField: string;
  public direction: string;

  constructor(private amazonService: AmazonItemsService, public dialog: MatDialog, private toastrService: ToastrService) {}

  ngOnInit() {
    this.page = 1;
    this.pageSize = 20;
    this.isLoaded = false;
    this.hideSpinner = false;
    this.sortField = 'id';
    this.direction = 'asc';

    this.getSavedListItem(this.page, this.pageSize, this.sortField, this.direction);
  }

  public getSavedListItem(page: number, pageSize: number, sortField: string, direction: string): void {
    this.amazonService.getSavedWithSourceList(page, pageSize, sortField, direction).subscribe(data => {
      this.hideSpinner = true;
      this.amazonItems = data;
    });
  }

  public deleteItem(item: AmazonItem): void {
    if (item) {
      this.amazonService.deleteItem(item.id).subscribe(
        data => {
          this.deleted = data;
        },
        err => {
          if (err && err.message) {
            this.toastrService.error(err.message);
          }
        },
        () => {
          this.getSavedListItem(this.page, this.pageSize, this.sortField, this.direction);
          this.toastrService.success(item.amazonTitle + ' deleted Successful!!');
        }
      );
    }
  }

  public pageChanged(event: any): void {
    this.hideSpinner = false;
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
}
