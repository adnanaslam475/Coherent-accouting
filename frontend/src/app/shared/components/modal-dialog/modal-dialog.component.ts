import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ItemsService } from 'app/service/items/items.service';
import { BestMatch, Item } from './../../interfaces/items.interface';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalDialogComponent implements OnInit {
  public savedItem: BestMatch;
  public amazonList: BestMatch[];
  private item: Item;
  public supplierForm: FormGroup;
  public suppliers = ['amazon', 'walmart'];
  public loading = false;
  public showNoItems = false;

  constructor(
    private dialogRef: MatDialogRef<ModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { amazonList: BestMatch[]; item: Item },
    private formBuilder: FormBuilder,
    private itemsService: ItemsService
  ) {
    this.amazonList = data.amazonList;
    this.item = data.item;
  }

  public ngOnInit() {
    this.supplierForm = this.formBuilder.group({
      supplier: [null, Validators.compose([Validators.required])]
    });
  }

  public saveItem(item: BestMatch): void {
    this.savedItem = item;
    this.dialogRef.close({ bestMatch: this.savedItem, amazonEntities: this.amazonList });
  }

  public preventClose(event: Event): void {
    event.stopPropagation();
  }

  public close(): void {
    this.dialogRef.close();
  }

  public hasAmazonList(): boolean {
    return this.amazonList && this.amazonList.length > 0;
  }
  public submit(form: FormGroup): void {
    if (form.valid) {
      this.loading = true;
      const searchParams = {
        url: this.item.url,
        source: form.controls['supplier'].value
      };
      this.itemsService.searchItemsByDescription(searchParams).subscribe(
        (amazonItems: BestMatch[]) => {
          this.loading = false;
          if (!amazonItems || amazonItems.length === 0) {
            this.showNoItems = true;
          }
          this.amazonList = amazonItems;
        },
        () => {
          this.loading = false;
          this.showNoItems = true;
        }
      );
    }
  }
}
