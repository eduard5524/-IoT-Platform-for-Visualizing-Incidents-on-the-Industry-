import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Manufacturer } from '../../models/api/manufacturer';
import { ManufacturerAdapter } from '../../models/adapters/Neuracore/manufacturer-adapter';
import { SessionService } from '../session.service';

@Injectable({
  providedIn: 'root'
})
export class ManufacturersService extends BaseHttpService<Manufacturer>{

  constructor(http: HttpClient,
    private sessionService: SessionService) {
    super(http, 'manufacturers', new ManufacturerAdapter());
  }

  public list(query?: string): any {
    const params = new HttpParams();
    if (query != null) {
        params.set('query', query);
    }
    return super._list(params);
}
}
