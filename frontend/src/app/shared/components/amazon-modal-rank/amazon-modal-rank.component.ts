import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AmazonItemsService } from '../../../service/amazon-items/amazon-items.service';
import { AmazonEstimate, AmazonRank } from '../../interfaces/amazon-items';

@Component({
  selector: 'app-amazon-modal-rank',
  templateUrl: './amazon-modal-rank.component.html',
  styleUrls: ['./amazon-modal-rank.component.scss']
})
export class AmazonModalRankComponent {
  public amazonRankList: any[];
  public selectedAmazonRank: AmazonRank;
  public objectKeys = Object.keys;
  public estimate: AmazonEstimate;
  public mainCategory: string;

  constructor(
    private dialogRef: MatDialogRef<AmazonModalRankComponent>,
    private amazonService: AmazonItemsService,
    @Inject(MAT_DIALOG_DATA) data: { amazonRankList: any[] }
  ) {
    this.amazonRankList = data.amazonRankList;
    this.selectedAmazonRank = new AmazonRank();
    this.mainCategory = this.getMainCategory();
  }

  public saveItem(): void {
    this.dialogRef.close({ data: this.estimate });
  }

  public preventClose(event: Event): void {
    event.stopPropagation();
  }

  public close(): void {
    this.dialogRef.close();
  }

  public onRankSelected(category: any) {
    this.selectedAmazonRank.category = this.mainCategory;
    this.selectedAmazonRank.rank = this.amazonRankList[category];
    this.amazonService.estimateSales(this.selectedAmazonRank).subscribe(est => {
      this.estimate = est;
      this.estimate.estimatedSalesCatrgory = category;
    });
  }

  private getMainCategory(): string {
    let category: string;
    Object.keys(this.amazonRankList).forEach(key => {
      if (key.indexOf('>') === -1) {
        category = key;
      }
    });

    return category;
  }
}
