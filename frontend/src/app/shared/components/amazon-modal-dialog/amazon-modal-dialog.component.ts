import { Component, OnInit, Inject } from '@angular/core';
import { BestMatch } from '../../interfaces/items.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-amazon-modal-dialog',
  templateUrl: './amazon-modal-dialog.component.html',
  styleUrls: ['./amazon-modal-dialog.component.scss']
})
export class AmazonModalDialogComponent {
  public savedItem: BestMatch;
  public amazonList: BestMatch[];

  constructor(private dialogRef: MatDialogRef<AmazonModalDialogComponent>, @Inject(MAT_DIALOG_DATA) data: { amazonList: BestMatch[] }) {
    this.amazonList = data.amazonList;
  }

  public saveItem(item: BestMatch): void {
    this.savedItem = item;
    this.dialogRef.close({ data: this.savedItem });
  }

  public preventClose(event: Event): void {
    event.stopPropagation();
  }

  public close(): void {
    this.dialogRef.close();
  }
}
