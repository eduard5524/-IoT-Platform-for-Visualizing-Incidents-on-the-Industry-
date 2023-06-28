import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { WarehouseLocation } from '../../models/api/warehouse-location';
import { WarehouseLocationAdapter } from '../../models/adapters/Neuracore/warehouse-location-adapter';

@Injectable({
  providedIn: 'root'
})
export class WarehouseLocationService extends BaseHttpService<WarehouseLocation>{

  constructor(public http: HttpClient) {
    super(http, 'warehouse-location', new WarehouseLocationAdapter());
  }

  public list(query?: string): any {
    console.log(query);
    const params = new HttpParams();
    if (query != null) {
      params.set('query', query);
    }
    return super._list(params);
  }
}
