import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/SUbject';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable()
export class WebSocketsService {
  public subject: Subject<any>;
  private stompClient;

  constructor() { }

  public connect(url): Subject<any> {
    if (!this.subject) {
      this.create(url);
      console.log('Successfully connected: ' + url);
    }
    return this.subject;
  }

  public sendRequest(searchParams, url) {
    this.stompClient.send(url, {}, searchParams);
  }

  private create(url): void {
    let ws = new SockJS(url);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/items', message => {
        if (message.body) {
          this.subject.next(message.body);
          console.log(message.body);
        }
      });
    });
  }
}
