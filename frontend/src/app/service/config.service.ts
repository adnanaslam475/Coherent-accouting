import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class ConfigService {
  private _account_url = 'http://161.97.72.230:8881/account/api';

  private _api_crawler_url = 'https://shipperbay.com/crawler/api';

  private _api_queue_url = 'https://shipperbay.com/queue/api';

  private _auth_url = 'http://161.97.72.230:8899/userauth/';

  private _url = 'https://shipperbay.com/crawler/';

  private _token_url = this._auth_url + 'oauth/token';

  private _login_url = this._account_url + '/login';

  private _logout_url = this._account_url + '/logout';

  private _change_password_url = this._account_url + '/user/change-password';

  private _whoami_url = this._account_url + '/user/who-am-i';

  private _user_url = this._account_url + '/user';

  private _user_dashboard = this._account_url + '/user/dashboard';

  private _user_eligibility = this._account_url + '/user/eligible';

  private _user_location_info = this._account_url + '/user/get-user-properties'; 

  private _user_location = this._account_url + '/user/update-country'; 

  private _countries = this._account_url + '/countries'; 

  private _users_url = this._user_url + '/all';

  private _forgot_password_url = this._user_url + '/forgot-password';

  private _foo_url = this._account_url + '/foo';

  private _reset_password = this._account_url + '/user/save-forgot-password';

  private _signup_url = this._account_url + '/user/create';

  private _saveRetailer = this._account_url + '/retailer/create';

  private _deleteRetailer = this._account_url + '/retailer/delete/';

  private _allSavedRetailer = this._account_url + '/retailer/list/';

  private _searchItems = this._api_crawler_url + '/search-items';

  private _searchItemsFirst = this._api_crawler_url + '/search-items-first';

  private _retailerUpload = this._account_url + '/uploadFile';

  private _searchTracking = this._api_crawler_url + '/search-tracking';

  private _searchTrackingByZip = this._api_crawler_url + '/generate-tracking-zip';

  private _searchTrackingByCarrier = this._account_url + '/tracking-numbers/list/';

  private _getTrackingDetails = this._api_crawler_url + '/tracking-details/';

  private _saveItem = this._account_url + '/item/create';

  private _getTrackingList = this._account_url + '/tracking-numbers/list/';

  private _deleteTracking = this._account_url + '/tracking-numbers/delete/';

  private _saveTracking = this._account_url + '/tracking-numbers/create';

  private _allSavedItems = this._account_url + '/item/list/';

  private _deleteItem = this._account_url + '/item/delete/';

  private _exportToTxt = this._account_url + '/download-example/Example_File_Upload_2';

  private _exportToXls = this._account_url + '/download-example/Example_File_Upload';

  private _createTax = this._account_url + '/tax/create-tax';

  private _getTax = this._account_url + '/tax/list';

  private _sendTicket = this._account_url + '/ticket/create-ticket';

  private _getTickets = this._account_url + '/ticket/list/';

  private _getIp = 'https://myexternalip.com/json';

  // private _validateSubscription = this._account_url + '/user/validate-subscription';

  private _makePayment = this._account_url + '/user/pay-subscription?sum=';

  private _completePayment = this._account_url + '/user/complete/payment';

  private _calculateProfit = this._api_crawler_url + '/calculate-profit';

  private _calculateProfitAmazon = this._api_crawler_url + '/calculate-profit-amazon';

  // private _subscribtionDate = this._account_url + '/user/subscribtion-date-all';

  private _getItemUserStatistic = this._api_crawler_url + '/get-user-statistic';

  private _searchAmazonItems = this._api_crawler_url + '/search-items-amazon';

  private _connectAmazonSocket = this._url + 'socket';

  private _amazonSaveItem = this._account_url + '/amazon-item/create';

  private _estimateSales = this._api_crawler_url + '/estimate-sales-per-day';

  private _getSavedWithSource = this._account_url + '/amazon-item/list/with-source/';

  private _getSavedWithoutSource = this._account_url + '/amazon-item/list/without-source/';

  private _downloadAllAsins = this._account_url + '/download-asins';

  private _downloadSelectedAsins = this._account_url + '/download-selected-asins';

  private _topHundredByCategory = this._api_crawler_url + '/top-hundred-url';

  private _topCategories = this._api_crawler_url + '/amazon-item/subcategories';

  private _subCategories = this._api_crawler_url + '/amazon-item/subcategories';

  // private _validateSubscriptionsAll = this._user_url + '/validate-subscription-all';

  private _paySubscriptionUrl = this._user_url + '/pay-subscription-all';

  private _paymentAllUrl = this._user_url + '/complete/payment-all';

  // private _subscribtionDateAll = this._account_url + '/user/subscribtion-date-all';

  private _searchEbayItems = this._api_crawler_url + '/search-items-ebay';

  private _searchAmazonDatabaseItems = this._api_queue_url + '/search-items-amazon-database';

  private _deleteAmazonItem = this._account_url + '/amazon-item/delete/';

  private _searchItemsByDescr = this._api_crawler_url + '/search-items-amazon-by-describtion';

  private _generateAffiliateLink = this._user_url + '/generate-affiliate-link';

  private _affiliateInformation = this._user_url + '/affiliate-information';

  private _plans = this._user_url + '/get-user-plans';

  private _validateAccess = this._user_url + '/validate-access';

  private _searchEbayRetailers = this._api_crawler_url + '/search-users-ebay';

  get forgot_password_url(): string {
    return this._forgot_password_url;
  }

  get refresh_token_url(): string {
    return this._token_url;
  }

  get whoami_url(): string {
    return this._whoami_url;
  }

  get users_url(): string {
    return this._users_url;
  }

  get user_url(): string {
    return this._user_url;
  }

  get login_url(): string {
    return this._login_url;
  }

  get logout_url(): string {
    return this._logout_url;
  }

  get change_password_url(): string {
    return this._change_password_url;
  }

  get foo_url(): string {
    return this._foo_url;
  }

  get signup_url(): string {
    return this._signup_url;
  }

  get saveRetailer(): string {
    return this._saveRetailer;
  }

  get deleteRetailer(): string {
    return this._deleteRetailer;
  }

  get allSavedRetailer(): string {
    return this._allSavedRetailer;
  }

  get searchItems(): string {
    return this._searchItems;
  }

  get retailerUpload(): string {
    return this._retailerUpload;
  }

  get searchTracking(): string {
    return this._searchTracking;
  }

  get searchTrackingByZip(): string {
    return this._searchTrackingByZip;
  }

  get searchTrackingByCarrier(): string {
    return this._searchTrackingByCarrier;
  }

  get getTrackingDetails(): string {
    return this._getTrackingDetails;
  }

  get saveItem(): string {
    return this._saveItem;
  }

  get getTrackingList(): string {
    return this._getTrackingList;
  }

  get allSavedItems(): string {
    return this._allSavedItems;
  }

  get deleteItem(): string {
    return this._deleteItem;
  }

  get deleteTracking(): string {
    return this._deleteTracking;
  }

  get saveTracking(): string {
    return this._saveTracking;
  }

  get searchItemsFirst(): string {
    return this._searchItemsFirst;
  }
  get resetPassword(): string {
    return this._reset_password;
  }
  get exportToXls(): string {
    return this._exportToXls;
  }

  get exportToTxt(): string {
    return this._exportToTxt;
  }

  get getIp(): string {
    return this._getIp;
  }

  get getTaxes(): string {
    return this._getTax;
  }

  get createTax(): string {
    return this._createTax;
  }

  get sendTicket(): string {
    return this._sendTicket;
  }

  get getTickets(): string {
    return this._getTickets;
  }

  get userDashboard(): string {
    return this._user_dashboard;
  }

  get userEligibility(): string {
    return this._user_eligibility;
  }

  get userLocationInfo(): string {
    return this._user_location_info;
  }

  get userLocation(): string {
    return this._user_location;
  }

  get userCountries(): string {
    return this._countries;
  }

  get getToken(): string {
    return this._token_url;
  }

  // get validateSubscription(): string {
  //   return this._validateSubscription;
  // }

  get makePayment(): string {
    return this._makePayment;
  }

  get completePayment(): string {
    return this._completePayment;
  }

  get calculateProfit(): string {
    return this._calculateProfit;
  }

  // get subscribtionDate(): string {
  //   return this._subscribtionDate;
  // }

  get getItemUserStatistic(): string {
    return this._getItemUserStatistic;
  }

  get searchAmazonItems(): string {
    return this._searchAmazonItems;
  }

  get connectAmazonSocket(): string {
    return this._connectAmazonSocket;
  }

  get calculateProfitAmazon(): string {
    return this._calculateProfitAmazon;
  }

  get amazonSaveItem(): string {
    return this._amazonSaveItem;
  }

  get estimateSales(): string {
    return this._estimateSales;
  }

  get getSavedWithSource(): string {
    return this._getSavedWithSource;
  }

  get getSavedWithoutSource(): string {
    return this._getSavedWithoutSource;
  }

  get downloadAllAsins(): string {
    return this._downloadAllAsins;
  }

  get downloadSelectedAsins(): string {
    return this._downloadSelectedAsins;
  }

  get topHundredByCategory(): string {
    return this._topHundredByCategory;
  }

  get topCategories(): string {
    return this._topCategories;
  }

  get subCategories(): string {
    return this._topCategories;
  }

  // get validateSubscriptionsAll(): string {
  //   return this._validateSubscriptionsAll;
  // }

  get paySubscriptionUrl(): string {
    return this._paySubscriptionUrl;
  }

  get paymantAllUrl(): string {
    return this._paymentAllUrl;
  }

  // get subscriptionDateAll(): string {
  //   return this._subscribtionDateAll;
  // }

  get searchEbayItems(): string {
    return this._searchEbayItems;
  }

  get deleteAmazonItem(): string {
    return this._deleteAmazonItem;
  }

  get searchAmazonDatabaseItems(): string {
    return this._searchAmazonDatabaseItems;
  }

  get searchItemsByDescription(): string {
    return this._searchItemsByDescr;
  }

  get generateAffiliateLink(): string {
    return this._generateAffiliateLink;
  }

  get plans(): string {
    return this._plans;
  }

  get affiliateInformation(): string {
    return this._affiliateInformation;
  }

  get validateAccess(): string {
    return this._validateAccess;
  }

  get searchEbayRetailers(): string {
    return this._searchEbayRetailers;
  }
}
