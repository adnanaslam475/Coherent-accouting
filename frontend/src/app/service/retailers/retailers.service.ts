import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ApiService } from '../api.service';
import { ConfigService } from '../config.service';
import { Retailer, RetailersSavedList, SearchRetailersParams } from '../../shared/interfaces/retailers';
import {Subject} from "rxjs";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {AuthService} from "../auth.service";

@Injectable()
export class RetailersService {
  public retailers: Subject<Retailer> = new Subject<Retailer>();
  private stompClient;
  private ws: any;

  constructor(
    private apiService: ApiService,
    private config: ConfigService,
    private authService: AuthService
  ) { }

  public connect(): Subject<boolean> {
    const connected: Subject<boolean> = new Subject();
    this.ws = new SockJS(this.config.connectAmazonSocket);
    this.stompClient = Stomp.over(this.ws);
    this.retailers = new Subject<Retailer>();
    const that = this;
    this.stompClient.connect({}, frame => {
      connected.next(true);
      connected.complete();
      const urlParts = that.stompClient.ws._transport.url.split('/');
      that.stompClient.subscribe('/ebay-sellers_' + urlParts[6], message => {
        if (message.body) {
          const messageBody = message.body;
          if (messageBody === 'End of request') {
            that.retailers.complete();
            return;
          }
          const item: Retailer = JSON.parse(messageBody) as Retailer;
          that.retailers.next(item);
        }
      });
    });

    return connected;
  }

  public closeConnection() {
    const that = this;
    this.retailers.complete();
    if (this.stompClient) {
      this.stompClient.disconnect(frame => {
        that.stompClient.unsubscribe();
      }, {});
    }
  }

  public searchRetailers(searchParams): void {
    const tokenObject = this.authService.getToken();
    const token = !tokenObject ? null : JSON.parse(tokenObject);
    searchParams.username = token.username;
    searchParams.pageNumber = 1;
    this.stompClient.send('/app/search-users-ebay', {}, JSON.stringify(searchParams));
  }

  getAllSavedRetailers(page: number, pageSize: number, sortField: string, direction: string): Observable<RetailersSavedList> {
    // const args = new HttpParams({ fromString: });
    return this.apiService.get(this.config.allSavedRetailer + page + '/' + pageSize +
      '?sortField=' + sortField + '&direction=' + direction);
  }

  saveRetailer(retailer: Retailer) {
    return this.apiService.post(this.config.saveRetailer, retailer);
  }

  deleteRetailer(id: string): Observable<any> {
    return this.apiService.delete(this.config.deleteRetailer + id);
  }

  exportToXls(): Observable<any> {
    return this.apiService.get(this.config.exportToXls);
  }

  exportToTxt(): Observable<any> {
    return this.apiService.get(this.config.exportToTxt);
  }
}
