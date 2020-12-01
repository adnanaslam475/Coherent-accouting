import { Injectable } from '@angular/core';
import { AuthService } from 'app/service';
import { AmazonItem } from 'app/shared/interfaces/amazon-items';
import { Observable, Subject } from 'rxjs/Rx';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { Category } from '../../shared/interfaces/categories.interface';
import { ItemUserStatistics } from '../../shared/interfaces/item-user-statistics.interface';
import { Item, ItemsSavedList, SearchItemsParams } from '../../shared/interfaces/items.interface';
import { ApiService } from '../api.service';
import { ConfigService } from '../config.service';

@Injectable()
export class ItemsService {
  public items: Subject<Item> = new Subject<Item>();
  private stompClient;
  private ws: any;

  constructor(private apiService: ApiService, private config: ConfigService, private authService: AuthService) {}

  public searchItems(params: SearchItemsParams): Observable<Item[]> {
    return this.apiService.post(this.config.searchItems, params);
  }

  public searchItemsFirst(params: SearchItemsParams): Observable<Item[]> {
    return this.apiService.post(this.config.searchItemsFirst, params);
  }
  public saveItem(item: Item): Observable<any> {
    return this.apiService.post(this.config.saveItem, item);
  }

  public getUserStatistic(retailerUserName: string): Observable<ItemUserStatistics> {
    return this.apiService.post(this.config.getItemUserStatistic, { retailerUserName }).map(rasult => {
      const propertyName = Object.keys(rasult)[0];
      return rasult[propertyName][0];
    });
  }

  public allSavedItems(page: number, pageSize: number, sortField: string, direction: string): Observable<ItemsSavedList> {
    return this.apiService.get(this.config.allSavedItems + page + '/' + pageSize + '?sortField=' + sortField + '&direction=' + direction);
  }

  public deleteItem(itemId: number | string): Observable<any> {
    return this.apiService.delete(this.config.deleteItem + '/' + itemId);
  }

  public calculateProfit(item: Item): Observable<number> {
    return this.apiService.post(this.config.calculateProfit, item);
  }

  public calculateProfitAmazon(item: AmazonItem): Observable<number> {
    return this.apiService.post(this.config.calculateProfitAmazon, item);
  }

  public downloadAllAsins(): Observable<string> {
    return this.apiService.get(this.config.downloadAllAsins);
  }

  public downloadSelectedAsins(ids: number[]): Observable<string> {
    return this.apiService.post(this.config.downloadSelectedAsins, ids);
  }

  public getTopItemsByCategory(url: string, category: string, page: string): Observable<any[]> {
    const path = this.config.topHundredByCategory + '?url=' + url + '&category=' + category + '&pageNumber=' + page;
    return this.apiService.get(path);
  }

  public getSubCategories(category: string): Observable<Category[]> {
    const path = this.config.subCategories + '?category=' + category;
    return this.apiService.get(path);
  }

  public getSubSubCategories(category: string, subCategory: string): Observable<Category[]> {
    const path = this.config.subCategories + '?category=' + category + '&subCategory=' + subCategory;
    return this.apiService.get(path);
  }

  public getCategories(): Observable<Category[]> {
    const path = this.config.topCategories + '?category=all-departments';
    return this.apiService.get(path);
  }

  public connect(): Subject<boolean> {
    const connected: Subject<boolean> = new Subject();
    const tokenObject = this.authService.getToken();
    const token = !tokenObject ? null : JSON.parse(tokenObject);
    // const options = {
    //   extraHeaders: {
    //     Authorization: 'Bearer ' + token.token
    //   }
    // };
    this.ws = new SockJS(this.config.connectAmazonSocket);
    this.stompClient = Stomp.over(this.ws);
    this.items = new Subject<Item>();
    const that = this;
    this.stompClient.connect({}, frame => {
      connected.next(true);
      connected.complete();
      const urlParts = that.stompClient.ws._transport.url.split('/');
      that.stompClient.subscribe('/ebay-items_' + urlParts[6], message => {
        if (message.body) {
          const messageBody = message.body;
          if (messageBody === 'End of request') {
            that.items.complete();
            return;
          }
          const item: Item = JSON.parse(messageBody) as Item;
          if (item.profit) {
            item.profit = Number(item.profit);
          }
          if (item.searchTimesSold) {
            item.searchTimesSold = Number(item.searchTimesSold);
          }
          that.items.next(item);
        }
      });
    });

    return connected;
  }

  public closeConnection() {
    const that = this;
    this.items.complete();
    if (this.stompClient) {
      this.stompClient.disconnect(frame => {
        that.stompClient.unsubscribe();
      }, {});
    }
  }

  public searchItemsMessage(searchParams): void {
    const tokenObject = this.authService.getToken();
    const token = !tokenObject ? null : JSON.parse(tokenObject);
    searchParams.username = token.username;
    this.stompClient.send('/app/search-items-ebay', {}, JSON.stringify(searchParams));
  }

  public search(searchParams) {
    return this.apiService.post(this.config.searchEbayItems, searchParams);
  }

  public searchItemsByDescription(searchParams) {
    return this.apiService.post(this.config.searchItemsByDescription, searchParams);
  }
}
