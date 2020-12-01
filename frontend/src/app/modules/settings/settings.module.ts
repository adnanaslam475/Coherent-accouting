import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsService } from '../../service/settings/settings.service';
import { SettingsFormComponent } from './settings-form/settings-form.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  imports: [CommonModule, SettingsRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [SettingsFormComponent],
  exports: [SettingsFormComponent],
  providers: [SettingsService]
})
export class SettingsModule { }
