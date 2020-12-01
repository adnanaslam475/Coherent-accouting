export interface SearchTrackingParams {
  trackingNumber: any;
  provider: string;
}
export interface SearchTrackingParamsByZip {
  dateRangeFrom: string;
  dateRangeTo: string;
  country: string;
  zipCode: string;
}
export interface SearchTrackingParamsByCarrier {
  shippingDateFrom: string;
  shippingDateTo: string;
  carrier: string;
}
export interface Tracking {
  id?: number;
  trackingNumber: string;
  trackingStatus: string;
  shippingDate: Date;
  shippingState: string;
  shippingCity: string;
  deliveryCity: string;
  deliveryDate: string;
  deliveryState: string;
  weight: string;
}

export interface TrackingSavedList {
  totalElements: number;
  elements: Tracking[];
}
