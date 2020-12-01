import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
export class FormUtils {
  public static isNumberCheck(control: AbstractControl): any {
    const value = control.value;
    const regex = /^\d*\.?\d*$/;
    return regex.test(value) ? null : { 'valueNumber': { valid: false } };
  }
}
