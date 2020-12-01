import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatFormFieldModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { EmptyItemListComponent } from './components/empty-item-list/empty-item-list.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ModalDiagramComponent } from './components/modal-diagram/modal-diagram.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { ModalTermsComponent } from './components/modal-terms/modal-terms.component';
import { ModalTicketsComponent } from './components/modal-tickets/modal-tickets.component';
import { JsonParsePipe } from './pipes/json-parse.pipe';
import { AmazonModalDialogComponent } from './components/amazon-modal-dialog/amazon-modal-dialog.component';
import { AmazonModalRankComponent } from './components/amazon-modal-rank/amazon-modal-rank.component';
import { AmazonModalDisplayRankComponent } from './components/amazon-modal-display-rank/amazon-modal-display-rank.component';
import { NgaModule } from '../theme/nga.module';
import { ImageComponent } from "../component/image";

@NgModule({
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, ChartsModule, NgaModule],
  declarations: [
    EmptyItemListComponent,
    LoaderComponent,
    ModalDialogComponent,
    AmazonModalDialogComponent,
    JsonParsePipe,
    ModalDiagramComponent,
    ModalTicketsComponent,
    ModalTermsComponent,
    AmazonModalRankComponent,
    AmazonModalDisplayRankComponent,
    ImageComponent
  ],
  exports: [
    EmptyItemListComponent,
    LoaderComponent,
    ModalDialogComponent,
    JsonParsePipe,
    ModalTicketsComponent,
    ModalDiagramComponent,
    ModalTermsComponent,
    NgaModule,
    ImageComponent
  ],
  entryComponents: [
    ModalDialogComponent,
    ModalDiagramComponent,
    ModalTicketsComponent,
    ModalTermsComponent,
    AmazonModalDialogComponent,
    AmazonModalRankComponent,
    AmazonModalDisplayRankComponent
  ]
})
export class SharedModule { }
