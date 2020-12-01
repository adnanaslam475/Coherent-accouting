import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, UserService } from 'app/service';
import { DisplayMessage } from '../../shared/interfaces/display-message';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  /**
   * Boolean used in telling the UI
   * that the form has been submitted
   * and is awaiting a response
   */
  submitted = false;

  notification: DisplayMessage;

  token: string;
  private tempToken: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      if (param['token']) {
        this.token = param['token'];
      }
    });
    this.form = this.formBuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])],
      token: ['']
    });
    this.authService.getTempToken().subscribe(data => (this.tempToken = data));
  }

  onSubmit() {
    /**
     * Innocent until proven guilty
     */

    this.notification = undefined;
    this.submitted = true;
    this.form.patchValue({
      token: this.token
    });

    this.userService
      .resetPassword(this.form.value, this.tempToken.access_token)
      // show me the animation
      .delay(1000)
      .subscribe(
        () => {
          this.router.navigate(['/login', { msgType: 'success', msgBody: 'Success! Please sign in with your new password.' }]);
        },
        (error: HttpResponse<any>) => {
          if (error.status === 200) {
            this.router.navigate(['/login', { msgType: 'success', msgBody: 'Success! Please sign in with your new password.' }]);
          } else {
            this.submitted = false;
            this.notification = { msgType: 'error', msgBody: 'Something gone wrong' };
          }
        }
      );
  }
}
