import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrackingComponent, EligibilityResolver } from './tracking.component';
import { TrackingListComponent } from './tracking-list/tracking-list.component';
import { LoginGuard } from '../../guard/login.guard';
import { TrackingFromZipComponent } from './tracking-from-zip/tracking-from-zip.component';
import { TrackingFromComponent } from './tracking-from/tracking-from.component';
import { TrackingFromCarrierComponent } from './tracking-carrier/tracking-from-carrier.component';



const routes: Routes = [
  {
    path: '',
    component: TrackingComponent,
    canActivate: [LoginGuard],
    // resolve: {
    //   userEligibility: EligibilityResolver
    // },
    children: [
      {
        path: '',
        redirectTo: 'search-by-zip',
        pathMatch: 'full'
      },
      {
        path: 'search-by-zip',
        component: TrackingFromZipComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'search',
        component: TrackingFromComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'list/:carrier',
        component: TrackingListComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'list',
        component: TrackingFromCarrierComponent,
        canActivate: [LoginGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackingRoutingModule {}
