export interface ValidateSubscriptionAll {
    ebaySubscription: boolean;
    ebaySubscriptionDate: string;
    ebaySubscriptionDaysLeft: number;
    amazonSubscription: boolean;
    amazonSubscriptionDate: string;
    amazonSubscriptionDaysLeft: number;
    trackingSubscription: boolean;
    trackingSubscriptionDate: string;
    trackingSubscriptionDaysLeft: number;
    trackingLimit: number;
}