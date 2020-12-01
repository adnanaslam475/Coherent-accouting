import { Inject } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthService, UserService } from '../service';
import { DisplayMessage } from '../shared/interfaces/display-message';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/SUbject';
import { ValidateSubscription } from '../shared/interfaces/validate-subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  validateSubscription: ValidateSubscription;
  title = 'Login';
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

  returnUrl: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

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
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.authService.logout();
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])]
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onResetCredentials() {
    this.router.navigate(['/forgot-password']);
  }

  onSubmit() {
    /**
     * Innocent until proven guilty
     */
    this.notification = undefined;
    this.submitted = true;
    this.authService.logout();
    this.authService
      .login(this.form.value)
      // show me the animation
      .subscribe(
        () => {

          this.router.navigate(['/system']);
          
          // this.authService.validateAccess().subscribe((allowed) => {
          //   if (allowed) {
          //     this.userService.validateSubscriptionsAll().subscribe(validate => {
          //       // navigate to payment only if all the subscriptions are missing
          //       const shouldNavigateToPayment = !validate ||
          //         (!validate.ebaySubscription &&
          //           !validate.amazonSubscription &&
          //           !validate.trackingSubscription);
          //       if (shouldNavigateToPayment) {
          //         this.router.navigate(['/system/my-plans']);
          //       } else {
          //         this.router.navigate(['/system']);
          //       }
          //     });
          //   } else {
          //     this.submitted = false;
          //     this.notification = { msgType: 'error', msgBody: 'Suspicious acitivity in your account. It is used from another user and location. Please contact customer support at shipperbay@gmail.com' };
          //     this.authService.logout();
          //     this.router.navigate(['/login']);
          //   }
          // });

        }, error => {
          this.submitted = false;
          this.notification = { msgType: 'error', msgBody: 'Incorrect username or password.' };
        }
      );
  }
}
