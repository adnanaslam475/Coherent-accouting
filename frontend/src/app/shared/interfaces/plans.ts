export class PlansProperies {
    name: string;
    property: string;
}

export class Plans {
    recommended: boolean;
    name: string;
    months: number;
    fee: number;
    ebaySubscription: boolean;
    trackingSubscription: boolean;
    trackingLimit?: number;
    amazonSubscription: boolean;
}

export class Payment {
    months: number;
    paymentId: string;
    payerId: string;
    fee: string;
    ebaySubscription: boolean;
    trackingSubscription: boolean;
    trackingLimit: number;
    amazonSubscription: boolean;
}