import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '../../../service/settings/settings.service';
import { Settings } from '../../../shared/interfaces/settings.interface';
import { FormUtils } from '../../../shared/utilities/form.utils';

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.scss']
})
export class SettingsFormComponent implements OnInit {
  public settingsForm: FormGroup;
  public defaultSettingsForm: Settings = {
    ebayTax: 0.0,
    amazonTax: 0.0,
    paypalTax: 0.0,
    otherTax: 0.0,
    country: 'US'
  };

  constructor(private formBuilder: FormBuilder, private settingsService: SettingsService, private toastrService: ToastrService) { }

  public ngOnInit(): void {
    this.getDefaultData();
    this.settingsForm = this.initForm();
  }

  public initForm(): FormGroup {
    return this.formBuilder.group({
      ebayTax: [this.defaultSettingsForm.ebayTax, [FormUtils.isNumberCheck]],
      amazonTax: [this.defaultSettingsForm.amazonTax, [FormUtils.isNumberCheck]],
      paypalTax: [this.defaultSettingsForm.paypalTax, [FormUtils.isNumberCheck]],
      otherTax: [this.defaultSettingsForm.otherTax, [FormUtils.isNumberCheck]],
      country: [this.defaultSettingsForm.country, Validators.compose([Validators.required])]
    });
  }

  public getDefaultData(): void {
    this.settingsService.getTaxList().subscribe((res: Settings) => {
      this.defaultSettingsForm = res;
      this.settingsForm.setValue(res);
    });
  }

  public submit(form: FormGroup): void {
    if (form.valid) {
      this.settingsService.createTax(form.value).subscribe(
        res => {
          this.toastrService.success('Taxes has been saved successfully!!');
        },
        err => {
          this.toastrService.error(err);
        }
      );
    }
  }
}
