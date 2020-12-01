import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Settings } from '../../shared/interfaces/settings.interface';
import { ApiService } from '../api.service';
import { ConfigService } from '../config.service';

@Injectable()
export class SettingsService {
  constructor(private apiService: ApiService, private config: ConfigService) { }

  public getTaxList(): Observable<Settings> {
    return this.apiService.get(this.config.getTaxes);
  }

  public createTax(settings: Settings): Observable<any> {
    return this.apiService.post(this.config.createTax, settings);
  }
}
