import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatProgressSpinnerModule, MatTabsModule, MatTooltipModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TrackingService } from '../../service/tracking/tracking.service';
import { SharedModule } from '../../shared/shared.module';
import { TrackingFromComponent } from './tracking-from/tracking-from.component';
import { TrackingListComponent } from './tracking-list/tracking-list.component';
import { TrackingRoutingModule } from './tracking-routing.module';
import { TrackingSearchListComponent } from './tracking-search-list/tracking-search-list.component';
import { TrackingComponent, EligibilityResolver } from './tracking.component';
import { TrackingFromZipComponent } from './tracking-from-zip/tracking-from-zip.component';
import { TrackingSearchListZipComponent } from './tracking-search-list-zipp/tracking-search-list-zip.component';
import { TrackingFromCarrierComponent } from './tracking-carrier/tracking-from-carrier.component';
import { TrackingCarrierListComponent } from './tracking-carrier-list/tracking-carrier-list.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TrackingRoutingModule,
    MatTabsModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot()
  ],
  providers: [
    TrackingService,
    MatDatepickerModule,
    MatNativeDateModule
    ],
  declarations: [
    TrackingComponent, 
    TrackingFromComponent, 
    TrackingFromZipComponent,
    TrackingFromCarrierComponent,
    TrackingCarrierListComponent,
    TrackingListComponent, 
    TrackingSearchListComponent,
    TrackingSearchListZipComponent]
})
export class TrackingModule { }
