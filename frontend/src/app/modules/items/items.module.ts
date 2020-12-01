import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { TooltipModule } from 'ng2-tooltip-directive';
import { MatInputModule, MatProgressSpinnerModule, MatSlideToggleModule, MatTabsModule } from '@angular/material';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ItemsService } from '../../service/items/items.service';
import { SharedModule } from '../../shared/shared.module';
import { ItemsComponent, ItemsFormComponent, ItemsListComponent, ItemsSearchListComponent, ItemsSearchListSupplierComponent } from './';
import { ItemUserStatisticsComponent } from './item-user-statistics/item-user-statistics.component';
import { ItemsCardComponent } from './item-user-statistics/items-card/items-card.component';
import { ItemsRoutingModule } from './items-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ItemsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    PaginationModule,
    NgCircleProgressModule,
    SharedModule,
    MatSlideToggleModule,
    TooltipModule
  ],
  declarations: [
    ItemsFormComponent,
    ItemsListComponent,
    ItemsSearchListComponent,
    ItemsSearchListSupplierComponent,
    ItemsComponent,
    ItemUserStatisticsComponent,
    ItemsCardComponent
  ],
  exports: [
    ItemsFormComponent,
    ItemsListComponent,
    ItemsSearchListComponent,
    ItemsSearchListSupplierComponent,
    ItemsComponent
  ],
  providers: [ItemsService]
})
export class ItemsModule {}
