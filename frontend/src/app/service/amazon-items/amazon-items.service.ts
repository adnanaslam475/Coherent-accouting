import { Injectable } from '@angular/core';
import { AuthService } from 'app/service';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/SUbject';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {
  AmazonDatabaseItems,
  AmazonDatabaseResult,
  AmazonEstimate,
  AmazonItem,
  AmazonItemsSavedList,
  AmazonRank
} from '../../shared/interfaces/amazon-items';
import { AmazonSearchParams } from '../../shared/interfaces/amazon-search-params';
import { ApiService } from '../api.service';
import { ConfigService } from '../config.service';

@Injectable()
export class AmazonItemsService {
  public amazonItems: Subject<AmazonItem> = new Subject<AmazonItem>();
  private stompClient;
  private ws: any;
  constructor(private config: ConfigService, private authService: AuthService, private apiService: ApiService) {}
  public connect(): Subject<boolean> {
    const connected: Subject<boolean> = new Subject();
    const tokenObject = this.authService.getToken();
    const token = !tokenObject ? null : JSON.parse(tokenObject);
    // const headers = {
    //   'Authorization': 'Bearer ' + token.token
    // };
    const options = {
      extraHeaders: {
        Authorization: 'Bearer ' + token.token
      }
    };
    this.ws = new SockJS(this.config.connectAmazonSocket);
    this.stompClient = Stomp.over(this.ws);
    this.amazonItems = new Subject<AmazonItem>();
    const that = this;
    this.stompClient.connect({}, frame => {
      connected.next(true);
      connected.complete();
      console.log(frame);
      const urlParts = that.stompClient.ws._transport.url.split('/');
      that.stompClient.subscribe('/items_' + urlParts[6], message => {
        if (message.body) {
          const messageBody = message.body;
          if (messageBody === 'End of request') {
            that.amazonItems.complete();
            return;
          }
          const amazonItem: AmazonItem = JSON.parse(messageBody) as AmazonItem;
          that.amazonItems.next(amazonItem);
        }
      });
    });

    return connected;
  }

  public closeConnection() {
    const that = this;
    this.amazonItems.complete();
    if (this.stompClient) {
      this.stompClient.disconnect(frame => {
        that.stompClient.unsubscribe();
      }, {});
    }
  }

  public searchAmazonItemsMessage(searchParams) {
    const tokenObject = this.authService.getToken();
    const token = !tokenObject ? null : JSON.parse(tokenObject);
    searchParams.username = token.username;
    this.stompClient.send('/app/search-items-amazon', {}, JSON.stringify(searchParams));
  }

  public searchAmazonItems(searchParams) {
    this.stompClient.send(this.config.searchAmazonItems, {}, searchParams);
  }

  public search(searchParams: AmazonSearchParams) {
    return this.apiService.post(this.config.searchAmazonItems, searchParams);
  }

  public saveItem(item: AmazonItem): Observable<any> {
    return this.apiService.post(this.config.amazonSaveItem, item);
  }

  public calculateProfitAmazon(item: AmazonItem): Observable<number> {
    return this.apiService.post(this.config.calculateProfitAmazon, item);
  }

  public estimateSales(rank: AmazonRank): Observable<AmazonEstimate> {
    return this.apiService.post(this.config.estimateSales, rank);
  }

  public getSavedWithoutSourceList(page: number, pageSize: number, sortField: string, direction: string): Observable<AmazonItemsSavedList> {
    return this.apiService.get(
      this.config.getSavedWithoutSource + page + '/' + pageSize + '?sortField=' + sortField + '&direction=' + direction
    );
  }

  public getSavedWithSourceList(page: number, pageSize: number, sortField: string, direction: string): Observable<AmazonItemsSavedList> {
    return this.apiService.get(
      this.config.getSavedWithSource + page + '/' + pageSize + '?sortField=' + sortField + '&direction=' + direction
    );
  }

  public deleteItem(itemId: string | number): Observable<any> {
    return this.apiService.delete(this.config.deleteAmazonItem + itemId);
  }

  public searchAmazonDatabaseItems(searchItems: AmazonDatabaseItems): Observable<AmazonDatabaseResult[]> {
    return this.apiService.post(this.config.searchAmazonDatabaseItems, searchItems);
  }
}
