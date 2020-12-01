import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-modal-terms',
  templateUrl: './modal-terms.component.html',
  styleUrls: ['./modal-terms.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalTermsComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<ModalDialogComponent>) { }

  ngOnInit() { }

  public close(): void {
    this.dialogRef.close();
  }
}
