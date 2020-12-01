import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserService } from '../../service/user.service';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardCardComponent } from './dashboard/dashboard-card/dashboard-card.component';

@NgModule({
  imports: [CommonModule, DashboardRoutingModule, NgCircleProgressModule.forRoot()],
  declarations: [DashboardComponent, DashboardCardComponent],
  providers: [UserService]
})
export class DashboardModule { }
