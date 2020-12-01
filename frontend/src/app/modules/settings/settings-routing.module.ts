import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsFormComponent } from './settings-form/settings-form.component';
import { LoginGuard } from '../../guard';

const routes: Routes = [
  {
    path: '',
    component: SettingsFormComponent,
    canActivate: [LoginGuard],
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
