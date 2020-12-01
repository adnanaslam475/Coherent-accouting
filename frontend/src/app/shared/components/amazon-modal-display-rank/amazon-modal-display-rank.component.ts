import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AmazonRank } from '../../interfaces/amazon-items';

@Component({
  selector: 'app-amazon-modal-display-rank',
  templateUrl: './amazon-modal-display-rank.component.html',
  styleUrls: ['./amazon-modal-display-rank.component.scss']
})
export class AmazonModalDisplayRankComponent {
  public amazonRankList: AmazonRank | string[];
  public title: string;

  constructor(
    private dialogRef: MatDialogRef<AmazonModalDisplayRankComponent>,
    @Inject(MAT_DIALOG_DATA) data: { amazonRankList: AmazonRank; title: string }
  ) {
    this.convertData(data);
    this.title = data.title || 'Sales Ranks';
  }

  public preventClose(event: Event): void {
    event.stopPropagation();
  }

  public close(): void {
    this.dialogRef.close();
  }

  private convertData(data): void {
    if (typeof this.amazonRankList === 'object') {
      this.amazonRankList = Object.keys(data.amazonRankList).map(key => `${data.amazonRankList[key]} in ${key}`);
    } else {
      this.amazonRankList = data.amazonRankList;
    }
  }
}
