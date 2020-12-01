import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RetailersComponent } from './retailers.component';
import { RetailersFormComponent } from './retailers-form/retailers-form.component';
import { RetailersListComponent } from './retailers-list/retailers-list.component';
import { RetailersUploadComponent } from './retailers-upload/retailers-upload.component';
import { RetailersImportComponent } from './retailers-import/retailers-import.component';
import { LoginGuard } from '../../guard/login.guard';

const routes: Routes = [
  {
    path: '',
    component: RetailersComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
      },
      {
        path: 'search',
        component: RetailersFormComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'list',
        component: RetailersListComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'import',
        component: RetailersImportComponent,
        canActivate: [LoginGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetailersRoutingModule { }
