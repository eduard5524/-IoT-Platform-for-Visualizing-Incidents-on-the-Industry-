import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Country } from '../models/api/country';
import { CountryAdapter } from '../models/adapters/country-adapter';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends BaseHttpService<Country>{

  constructor(http: HttpClient,
    private sessionService: SessionService) {
    super(http, 'countries', new CountryAdapter());
  }

  public list(query?: string): any {
    const params = new HttpParams();
    if (query != null) {
        params.set('query', query);
    }
    return super._list(params);
}
}