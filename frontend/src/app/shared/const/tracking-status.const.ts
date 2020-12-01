import { TrackingStatus } from '../enums/tracking-status.enum';

export const TrackingStatusMap: any = {
  [TrackingStatus.STATUS_DELIVERED]: 'Delivered'
  ,
  [TrackingStatus.STATUS_TRANSIT]: 'Transit'
  ,
  [TrackingStatus.STATUS_EXPIRED]: 'Expired'
};
