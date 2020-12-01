export interface AffiliateInfo {
  eligibleForDiscount: boolean;
  refereeDiscount: string;
  referrerDiscount: string;
  affiliates: Affiliate[];
}

export interface Affiliate {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  ipAddress: string;
  gdpr: boolean;
  referrer: string;
  hasValidPayment: boolean;
  subscriptionDate: string;
}

export interface AffiliateUrl {
  refUrl: string;
}

