import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin';
import {ChangePasswordComponent} from './change-password';
import {ActivateAccountComponent} from './component/activate-account/activate-account.component';
import {AffiliateProgramComponent} from './component/affiliate-program/affiliate-program.component';
import {ContactsComponent} from './component/contacts/contacts.component';
import {ForgotPasswordComponent} from './component/forgot-password/forgot-password.component';
import {MyPlansComponent, UserLocationResolver} from './component/my-plans/my-plans.component';
import {PaymentCompleteComponent} from './component/payment/payment-complete/payment-complete.component';
import {PaymentComponent} from './component/payment/payment.component';
import {PlansComponent, ContactResolve} from './component/plans/plans.component';
import {ResetPasswordComponent} from './component/reset-password/reset-password.component';
import {VideoLessonsComponent} from './component/video-lessons/video-lessons.component';
import {ForbiddenComponent} from './forbidden';
import {AdminGuard, GuestGuard} from './guard';
import {LoginGuard} from './guard';
// import {ValidateAllSubscriptionsGuard} from './guard/validate-all-subscriptions.guard';
// import {ValidateAmazonSubscriptionGuard} from './guard/validate-amazon-subscription.guard';
// import {ValidateEbaySubscriptionGuard} from './guard/validate-ebay-subscription.guard';
import {ValidateSubscriptionGuard} from './guard/validate-subscription.guard';
// import {ValidateTrackingSubscriptionGuard} from './guard/validate-tracking-subscription.guard';
import {HomeComponent} from './home';
import {LoginComponent} from './login';
import {AmazonCategoryItemsListComponent} from './modules/amazon-items/amazon-items-categories/amazon-category-items-list.component';
import {DatabaseSearchComponent} from './modules/amazon-items/database-search/database-search.component';
import {NotFoundComponent} from './not-found';
import {SignupComponent, TokenResolver} from './signup';
import {HomeLayoutComponent} from "./layouts/home-layout/home-layout.component";
import {MainLayoutComponent} from "./layouts/main-layout/main-layout.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {
          title: 'home'
        },
        pathMatch: 'full',
        canActivate: [GuestGuard],
      },
      {
        path: 'signup',
        component: SignupComponent,
        data: {
          title: 'Signup'
        },
        resolve: {
          token: TokenResolver
        },
        canActivate: [GuestGuard],
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Login'
        },
        canActivate: [GuestGuard],
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [GuestGuard],
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
        data: {
          title: 'Reset Password'
        },
        canActivate: [GuestGuard],
      },
      {
        path: '404',
        component: NotFoundComponent,
      },
      {
        path: '403',
        component: ForbiddenComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: MainLayoutComponent,
    children: [
      {path: '', component: AdminComponent}
    ],
    canActivate: [AdminGuard]
  },
  {
    path: 'system',
    component: MainLayoutComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: 'app/modules/dashboard/dashboard.module#DashboardModule',
        // canActivate: [ValidateAllSubscriptionsGuard]
      },
      {
        path: 'retailers',
        loadChildren: 'app/modules/retailers/retailers.module#RetailersModule',
        // canActivate: [ValidateEbaySubscriptionGuard]
      },
      {
        path: 'items',
        loadChildren: 'app/modules/items/items.module#ItemsModule',
        // canActivate: [ValidateEbaySubscriptionGuard]
      },
      {
        path: 'amazon-items',
        loadChildren: 'app/modules/amazon-items/amazon-items.module#AmazonItemsModule',
        // canActivate: [ValidateAmazonSubscriptionGuard]
      },
      {
        path: 'tracking',
        loadChildren: 'app/modules/tracking/tracking.module#TrackingModule',
        // canActivate: [ValidateTrackingSubscriptionGuard]
      },
      {
        path: 'settings',
        loadChildren: 'app/modules/settings/settings.module#SettingsModule',
        // canActivate: [ValidateAllSubscriptionsGuard]
      },
      {
        path: 'tickets',
        loadChildren: 'app/modules/tickets/tickets.module#TicketsModule',
        // canActivate: [ValidateAllSubscriptionsGuard]
      },
      {
        path: 'video-lessons',
        component: VideoLessonsComponent,
      },
      {
        path: 'my-plans',
        component: MyPlansComponent,
        resolve: {
          userLocation: UserLocationResolver
        }
      },
      {
        path: 'contacts',
        component: ContactsComponent,
      },
      {
        path: 'activate',
        component: ActivateAccountComponent,
      },
      {
        path: 'payment',
        component: PaymentComponent,
        data: {
          title: 'Payment'
        },
      },
      {
        path: 'payment-complete',
        component: PaymentCompleteComponent,
        data: {
          title: 'Payment Complete'
        },
      },
      {
        path: 'plans',
        component: PlansComponent,
        resolve: {
          plans: ContactResolve
        }
      },
      {
        path: 'categories',
        component: AmazonCategoryItemsListComponent,
        // canActivate: [ValidateAmazonSubscriptionGuard]
      },
      {
        path: 'database-search',
        component: DatabaseSearchComponent,
        // canActivate: [ValidateAmazonSubscriptionGuard]
      },
      {
        path: 'affiliate-program',
        component: AffiliateProgramComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        data: {
          title: 'Change Password'
        },
      },
      {
        path: '404',
        component: NotFoundComponent,
      },
      {
        path: '**',
        redirectTo: '404'
      }
    ],
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
