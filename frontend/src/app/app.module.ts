import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// material
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatIconRegistry,
  MatInputModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTableModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatFormFieldModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPayPalModule } from 'ngx-paypal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiCardComponent, FooterComponent, GithubComponent, HeaderComponent, SidebarComponent } from './component';
import { ActivateAccountComponent } from './component/activate-account/activate-account.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { AccountMenuComponent } from './component/header/account-menu/account-menu.component';
import { AdminGuard, GuestGuard, LoginGuard } from './guard';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RetailersModule } from './modules/retailers/retailers.module';
import { NotFoundComponent } from './not-found';

import { NgModule } from '@angular/core';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { AdminComponent } from './admin/admin.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AffiliateProgramComponent } from './component/affiliate-program/affiliate-program.component';
import { ContactsComponent } from './component/contacts/contacts.component';
import { MyPlansComponent, UserLocationResolver } from './component/my-plans/my-plans.component';
import { PaymentCompleteComponent } from './component/payment/payment-complete/payment-complete.component';
import { PaymentComponent } from './component/payment/payment.component';
import { PlansTableComponent } from './component/plans/plans-table/plans-table.component';
import { PlansComponent, ContactResolve } from './component/plans/plans.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { VideoLessonsComponent } from './component/video-lessons/video-lessons.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
// import { ValidateAllSubscriptionsGuard } from './guard/validate-all-subscriptions.guard';
import { ValidateAmazonSubscriptionGuard } from './guard/validate-amazon-subscription.guard';
import { ValidateEbaySubscriptionGuard } from './guard/validate-ebay-subscription.guard';
import { ValidateSubscriptionGuard } from './guard/validate-subscription.guard';
import { ValidateTrackingSubscriptionGuard } from './guard/validate-tracking-subscription.guard';
import { AmazonItemsModule } from './modules/amazon-items/amazon-items.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ItemsModule } from './modules/items/items.module';
import { SettingsModule } from './modules/settings/settings.module';
import { TrackingModule } from './modules/tracking/tracking.module';
import { ApiService, AuthService, ConfigService, FooService, UserService, FingerprintService } from './service';
import { ErrorHandlerService } from './service/error-handler.service';
import { PaymentService } from './service/payment/payment.service';
import { TokenInterceptor } from './service/token.interceptor';
import { SignupComponent, TokenResolver } from './signup/signup.component';
import { NgaModule } from './theme/nga.module';
import { HomeLayoutComponent } from "./layouts/home-layout/home-layout.component";
import { MainLayoutComponent } from "./layouts/main-layout/main-layout.component";
import { ModalComponent } from './shared/components/modal/modal-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ApiCardComponent,
    HomeComponent,
    GithubComponent,
    LoginComponent,
    NotFoundComponent,
    AccountMenuComponent,
    ChangePasswordComponent,
    ForbiddenComponent,
    AdminComponent,
    ActivateAccountComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    VideoLessonsComponent,
    ContactsComponent,
    PaymentComponent,
    PaymentCompleteComponent,
    MyPlansComponent,
    ModalComponent,
    PlansComponent,
    PlansTableComponent,
    AffiliateProgramComponent,
    HomeLayoutComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatMenuModule,
    MatTooltipModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatCheckboxModule,
    FlexLayoutModule,
    RetailersModule,
    ItemsModule,
    AmazonItemsModule,
    TrackingModule,
    SettingsModule,
    DashboardModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      autoDismiss: true,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
      closeButton: true
    }),
    ToastContainerModule,
    NgCircleProgressModule.forRoot(),
    Angular2FontawesomeModule,
    NgxPayPalModule,
    NgxDatatableModule,
    NgaModule,
    NgxUiLoaderModule
  ],
  entryComponents: [ModalComponent],
  providers: [
    LoginGuard,
    GuestGuard,
    AdminGuard,
    ValidateSubscriptionGuard,
    ValidateEbaySubscriptionGuard,
    ValidateAmazonSubscriptionGuard,
    ValidateTrackingSubscriptionGuard,
    // ValidateAllSubscriptionsGuard,
    FooService,
    AuthService,
    FingerprintService,
    ApiService,
    UserService,
    ContactResolve,
    UserLocationResolver,
    TokenResolver,
    ConfigService,
    ErrorHandlerService,
    PaymentService,
    MatIconRegistry,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
