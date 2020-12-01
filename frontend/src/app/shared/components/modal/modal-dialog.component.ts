import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserLocationDialogData, Country } from 'app/shared/interfaces/user-statistics';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'app/service';

@Component({
  selector: 'app-location-modal',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalComponent implements OnInit {

  public countries: Country[] = [];

//   private countries: any [] = [
//     { country: 'Austria', countryCode: 'AU' },
//     { country: 'Bulgaria', countryCode: 'BG' }
// ];

public accountTypes: any [] = [
  { accountType: 'PERSONAL', displayName: 'Personal' },
  { accountType: 'COMPANY', displayName: 'Company' }
];

  countryForm: FormGroup;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserLocationDialogData) {}

  onSaveClick(countryForm: FormGroup): void {
    if (countryForm.valid) {
      this.userService.updateUserLocation(this.buildRequest(countryForm)).subscribe(
        (result: any) => {
          console.log(result);
        });
      this.dialogRef.close();
    }
  }

  private buildRequest(countryForm: FormGroup):  UserLocationDialogData {
    let request = {
      isoAlpha2Country: countryForm.value.country,
      accountType: countryForm.value.accountType
    }
    return request;
  }

  ngOnInit() {
    this.userService.getUserCountries().subscribe(
        (result: Country[]) => {
          this.countries = result;
    });
    this.countryForm = this.fb.group({
      country: [null, [Validators.required]],
      accountType: [null, [Validators.required]]
  });
  }

}