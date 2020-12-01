import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidateSubscriptionAll } from 'app/shared/interfaces/validate-subscriptions';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/SUbject';
import { AffiliateInfo, AffiliateUrl } from '../shared/interfaces/affiliate-program.interface';
import { SubscriptionDate } from '../shared/interfaces/subscription-date';
import { UserStatistics, UserLocation, UserLocationDialogData, Country } from '../shared/interfaces/user-statistics';
import { ValidateSubscription } from '../shared/interfaces/validate-subscription';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';
import { Plans } from 'app/shared/interfaces/plans';
import { Eligibility } from 'app/shared/interfaces/user.interface';

@Injectable()
export class UserService {
  currentUser;
  public subscription: ValidateSubscription;
  public ebaySubscription: ValidateSubscription = {} as ValidateSubscription;
  public amazonSubscription: ValidateSubscription = {} as ValidateSubscription;
  public trackingSubscription: ValidateSubscription = {} as ValidateSubscription;
  public subscriptioDate: SubscriptionDate;
  public subDays = new Subject<SubscriptionDate>();

  constructor(private apiService: ApiService, private config: ConfigService, private authenticationService: AuthService) {}

  public initUser() {
    const username = (this.currentUser && this.currentUser.username) || '';
    return this.apiService
      .get(this.config.refresh_token_url)
      .toPromise()
      .then(res => {
        if (res.access_token !== null) {
          return this.getMyInfo()
            .toPromise()
            .then(user => {
              this.currentUser = user;
            });
        }
      })
      .catch(() => null);
  }

  getMyInfo(): Observable<any> {
    return this.apiService.get(this.config.whoami_url, {}).map(user => (this.currentUser = user));
  }

  getAll(): Observable<any> {
    return this.apiService.get(this.config.users_url);
  }

  resetPassword(payload, tempToken: any) {
    let headers = new HttpHeaders();
    headers = headers
      .set('Authorization', 'Bearer ' + tempToken)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');

    return this.apiService.post(this.config.resetPassword, payload, headers);
  }

  getDashboardInfo(): Observable<UserStatistics> {
    return this.apiService.get(this.config.userDashboard);
  }

  getUserEligibility(): Observable<Eligibility> {
    return this.apiService.get(this.config.userEligibility);
  }

  isFullyRegistered(): Observable<UserLocation> {
    return this.apiService.get(this.config.userLocationInfo);
  }

  updateUserLocation(payload: UserLocationDialogData): Observable<any> {
    return this.apiService.put(this.config.userLocation, payload);
  }

  getUserCountries(): Observable<Country[]> {
    return this.apiService.get(this.config.userCountries);
  }

  validateSubscription(): Observable<ValidateSubscription> {
    return null;
  }

  // getSubscribtionDate(): Observable<SubscriptionDate> {
  //   return this.apiService.get(this.config.subscribtionDate);
  // }

  // getSubscriptionDateAll(): Observable<SubscriptionDate> {
  //   return this.apiService.get(this.config.subscriptionDateAll);
  // }

  // setSubscribtionDate(value: SubscriptionDate) {
  //   this.subDays.next(value);
  // }

  // validateSubscriptionsAll(): Observable<ValidateSubscriptionAll> {
  //   return this.apiService.post(this.config.validateSubscriptionsAll, '').map((response: ValidateSubscriptionAll) => {
  //     if (!response) {
  //       return response;
  //     }
  //     this.ebaySubscription.validate = response.ebaySubscription;
  //     this.amazonSubscription.validate = response.amazonSubscription;
  //     this.trackingSubscription.validate = response.trackingSubscription;
  //     return response;
  //   });
  // }

  getPlans(): Observable<Plans[]> {
    return this.apiService.get(this.config.plans);
  }

  generateAffiliateLink(): Observable<AffiliateUrl> {
    return this.apiService.get(this.config.generateAffiliateLink);
  }

  getAffiliateInformation(): Observable<AffiliateInfo> {
    return this.apiService.get(this.config.affiliateInformation);
  }
}
