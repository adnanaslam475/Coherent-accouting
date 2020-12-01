import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RetailersComponent } from './retailers.component';
import { RetailersRoutingModule } from './retailers-routing.module';
import { RetailersService } from '../../service/retailers/retailers.service';
import { RetailersFormComponent } from './retailers-form/retailers-form.component';
import { RetailersSearchListComponent } from './retailers-search-list/retailers-search-list.component';
import { MatTabsModule, MatInputModule, MatProgressSpinnerModule, MatProgressBarModule } from '@angular/material';
import { RetailersListComponent } from './retailers-list/retailers-list.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RetailersUploadComponent } from './retailers-upload/retailers-upload.component';
import { SharedModule } from '../../shared/shared.module';
import { ProgressHttpModule } from 'angular-progress-http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RetailersImportComponent } from './retailers-import/retailers-import.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RetailersRoutingModule,
    MatTabsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    PaginationModule.forRoot(),
    ProgressHttpModule,
    HttpClientModule,
    HttpModule,
    SharedModule
  ],
  providers: [RetailersService],
  declarations: [RetailersComponent, RetailersFormComponent, RetailersSearchListComponent, RetailersListComponent, RetailersUploadComponent, RetailersImportComponent]
})
export class RetailersModule { }
