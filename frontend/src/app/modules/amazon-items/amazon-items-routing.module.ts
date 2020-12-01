import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../../guard/login.guard';
import { AmazonItemsFormComponent } from './amazon-items-form/amazon-items-form.component';
import { AmazonItemsSavedListComponent } from './amazon-items-saved-list/amazon-items-saved-list.component';
import { AmazonItemsSavedSourceComponent } from './amazon-items-saved-source/amazon-items-saved-source.component';
import { AmazonItemsComponent } from './amazon-items.component';

const routes: Routes = [
  {
    path: '',
    component: AmazonItemsComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
      },
      {
        path: 'search',
        component: AmazonItemsFormComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'items-without-source-list',
        component: AmazonItemsSavedListComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'items-with-source-list',
        component: AmazonItemsSavedSourceComponent,
        canActivate: [LoginGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmazonItemsRoutingModule {}
