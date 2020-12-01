import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpOptions } from './http-options';

@Injectable()
export class HttpClient {
  constructor(private http: Http, private options: HttpOptions) {}
}
