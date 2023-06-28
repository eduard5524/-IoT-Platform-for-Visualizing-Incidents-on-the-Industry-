import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Provider } from '../../models/api/provider';
import { ProviderAdapter } from '../../models/adapters/Neuracore/provider-adapter';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService extends BaseHttpService<Provider>{

  constructor(public http: HttpClient) {
    super(http, 'providers', new ProviderAdapter());
  }



  public list(query?: string): any {
    const params = new HttpParams();
    if (query != null) {
      params.set('query', query);
    }
    return super._list(params);
  }
}
