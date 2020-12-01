import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import {
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import { TooltipModule } from 'ng2-tooltip-directive';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { BarRatingModule } from 'ngx-bar-rating';
import { AmazonItemsService } from '../../service/amazon-items/amazon-items.service';
import { WebSocketsService } from '../../service/web-socket/web-sockets.service';
import { SharedModule } from '../../shared/shared.module';
import { AmazonCategoryItemsListComponent } from './amazon-items-categories/amazon-category-items-list.component';
import { TopItemComponent } from './amazon-items-categories/top-item/top-item.component';
import { AmazonItemsFormComponent } from './amazon-items-form/amazon-items-form.component';
import { AmazonListPrimeComponent } from './amazon-items-list-source/amazon-items-list-source.component';
import { AmazonItemsListComponent } from './amazon-items-list/amazon-items-list.component';
import { AmazonItemsRoutingModule } from './amazon-items-routing.module';
import { AmazonItemsSavedListComponent } from './amazon-items-saved-list/amazon-items-saved-list.component';
import { AmazonItemsSavedSourceComponent } from './amazon-items-saved-source/amazon-items-saved-source.component';
import { AmazonItemsComponent } from './amazon-items.component';
import { DatabaseSearchComponent } from './database-search/database-search.component';
import { DatabaseTableResultComponent } from './database-search/database-table-result/database-table-result.component';

@NgModule({
  imports: [
    CommonModule,
    AmazonItemsRoutingModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    BarRatingModule,
    TooltipModule,
    SharedModule,
    PaginationModule,
    Ng4LoadingSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule
  ],
  declarations: [
    AmazonItemsComponent,
    AmazonItemsFormComponent,
    AmazonItemsListComponent,
    AmazonListPrimeComponent,
    AmazonItemsSavedListComponent,
    AmazonItemsSavedSourceComponent,
    AmazonCategoryItemsListComponent,
    TopItemComponent,
    DatabaseSearchComponent,
    DatabaseTableResultComponent
  ],
  providers: [AmazonItemsService, WebSocketsService]
})
export class AmazonItemsModule {}
