import { HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthService, UserService, FingerprintService } from '../service';
import { DisplayMessage } from '../shared/interfaces/display-message';

import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/SUbject';
import { ModalTermsComponent } from '../shared/components/modal-terms/modal-terms.component';
import { TempToken } from '../shared/interfaces/token-temp';
import { Country } from 'app/shared/interfaces/user-statistics';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  title = 'Sign up';
  restrictionMessage = 'Registrations are limited. Please try to register again on 14.07!';
  form: FormGroup;

  /**
   * Boolean used in telling the UI
   * that the form has been submitted
   * and is awaiting a response
   */
  submitted = false;

  /**
   * Notification message from received
   * form request or router
   */
  notification: DisplayMessage;

  returnUrl = 'activate';
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private countries: Country[] = [];
  accountTypes: any [] = [
    { accountType: 'PERSONAL', displayName: 'Personal' },
    { accountType: 'COMPANY', displayName: 'Company' }
  ];
  public defaultForm = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    ipAddress: '',
    gdpr: false,
    identifier: null
  };
  private ipAddress: any;
  private successMessage = `Activation link has been sent to your email.
  Please also check your junk/spam folder.`;
  private tempToken: any;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private fingerprintService: FingerprintService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.route.params.takeUntil(this.ngUnsubscribe).subscribe((params: DisplayMessage) => {
      this.notification = params;
    });

    this.tempToken = this.route.snapshot.data['token'];
    this.authService.countries(this.tempToken.access_token).subscribe(
      (result: Country[]) => {
        this.countries = result;
    });

    this.form = this.formBuilder.group({
      email: [this.defaultForm.email, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64), Validators.email])],
      password: [this.defaultForm.password, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])],
      firstName: [this.defaultForm.firstName],
      lastName: [this.defaultForm.lastName],
      isoAlpha2Country: [null, [Validators.required]],
      accountType: [null, [Validators.required]],
      ipAddress: [this.defaultForm.ipAddress],
      gdpr: [this.defaultForm.gdpr, Validators.compose([Validators.requiredTrue])],
      identifier: [this.defaultForm.identifier]
    });

    this.authService.getIpAddress().subscribe(data => {
      this.form.patchValue({
        ipAddress: data.ip
      });
    });
    
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  isFormValid() {
   return this.form.valid;
    // return false;
  }

  public openTermsModal(): void {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '700px';

    const dialogRef: MatDialogRef<ModalTermsComponent> = this.dialog.open(ModalTermsComponent, dialogConfig);
  }

  onSubmit() {
    /**
     * Innocent until proven guilty
     */
    this.notification = undefined;
    this.submitted = true;

    this.form.patchValue({
      identifier: this.fingerprintService.get()
    });

    const payload = Object.assign({}, this.form.value, { username: this.form.value['email'] });
    if (this.form.valid) {
      this.authService
        .signup(payload, this.tempToken.access_token)
        // show me the animation
        .delay(500)
        .subscribe(
          data => {
            var user = {username: payload.username, password: payload.password};
            this.authService
          .login(user).subscribe(() => {
            this.router.navigate(['/system']);
        }
      );
          },
          (error: HttpResponse<any>) => {
            this.submitted = false;
            if (error.status === 201) {
              // this.router.navigate([this.returnUrl]);
              this.form.reset(this.defaultForm);
              this.notification = { msgType: 'success', msgBody: this.successMessage };
            } else {
              this.notification = { msgType: 'error', msgBody: error['error'].errorMessage };
            }
          }
        );
    }
  }
}

@Injectable()
export class TokenResolver implements Resolve<any> {
  constructor(private authService: AuthService) {}
  resolve(route: ActivatedRouteSnapshot) {
    return this.authService.getTempToken();
  }
}
