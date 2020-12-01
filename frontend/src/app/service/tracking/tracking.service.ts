import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { ConfigService } from '../config.service';
import { SearchTrackingParams, Tracking, SearchTrackingParamsByZip, SearchTrackingParamsByCarrier } from '../../shared/interfaces/tracking';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TrackingService {

  constructor(
    private apiService: ApiService,
    private config: ConfigService
  ) { }

  searchTracking(params: SearchTrackingParams): Observable<any> {
    return this.apiService.post(this.config.searchTracking, params);
  }

  searchTrackingByZip(params: SearchTrackingParamsByZip): Observable<any> {
    return this.apiService.post(this.config.searchTrackingByZip, params);
  }

  searchTrackingByCarrier(page: number, pageSize: number, params: SearchTrackingParamsByCarrier): Observable<any> {
    return this.apiService.post(this.config.searchTrackingByCarrier + page + '/' + pageSize , params);
  }

  getTrackingDetails(trackingNumber: string): Observable<Tracking> {
    return this.apiService.get(this.config.getTrackingDetails + trackingNumber);
  }

  getTrackingList(page: number, pageSize: number, carrier: string): Observable<any> {
    return this.apiService.get(this.config.getTrackingList + page + '/' + pageSize, {
      carrier
    });
  }

  deleteTrackingNumber(id: any): Observable<any> {
    return this.apiService.delete(this.config.deleteTracking + id);
  }

  saveTrackingNumber(tracking: Tracking): Observable<any> {
    return this.apiService.post(this.config.saveTracking, tracking);
  }
}
