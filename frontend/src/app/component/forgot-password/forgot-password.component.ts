import { Inject } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, UserService } from 'app/service';
import { DisplayMessage } from 'app/shared/interfaces/display-message';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/SUbject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  title = 'Forgot password?';
  public subtitle = `Enter your e-mail address and we'll send you a link to reset your password.`;
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

  returnUrl = '/';
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private tempToken: any;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.route.params.takeUntil(this.ngUnsubscribe).subscribe((params: DisplayMessage) => {
      this.notification = params;
    });
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64), Validators.email])]
    });
    this.authService.getTempToken().subscribe(data => (this.tempToken = data));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSubmit() {
    /**
     * Innocent until proven guilty
     */
    this.notification = undefined;
    this.submitted = true;

    this.authService
      .forgotPassword(this.form.value, this.tempToken.access_token)
      // show me the animation
      .delay(1000)
      .subscribe(
        () => {
          this.submitted = false;
          this.notification = { msgType: 'success', msgBody: 'We sent you confirmation mail to your e-mail address.' };
        },
        error => {
          this.submitted = false;
          this.notification = { msgType: 'error', msgBody: 'We could not find an account for that e-mail address.' };
        }
      );
  }
}
