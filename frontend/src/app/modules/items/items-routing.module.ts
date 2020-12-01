import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent, ItemsFormComponent, ItemsListComponent } from './';
import { LoginGuard } from 'app/guard';

const routes: Routes = [
  {
    path: '',
    component: ItemsComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
      },
      {
        path: 'search',
        component: ItemsFormComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'search/:retailerUsername',
        component: ItemsFormComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'list',
        component: ItemsListComponent,
        canActivate: [LoginGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
