import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Ticket, TicketList } from '../../shared/interfaces/ticket.interface';
import { ApiService } from '../api.service';
import { ConfigService } from '../config.service';

@Injectable()
export class TicketsService {
  constructor(private apiService: ApiService, private config: ConfigService, private httpClient: HttpClient) { }

  getTickets(page: number, pageSize: number): Observable<TicketList> {
    return this.apiService.get(this.config.getTickets + page + '/' + pageSize);
  }

  sendTicket(ticket: Ticket): Observable<any> {
    return this.apiService.post(this.config.sendTicket, ticket);
  }
}
