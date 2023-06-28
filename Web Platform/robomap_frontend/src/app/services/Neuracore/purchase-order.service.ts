import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PurchaseOrder } from '../../models/api/purchase-order';
import { PurchaseOrderAdapter } from '../../models/adapters/Neuracore/purchase-order-adapter';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService extends BaseHttpService<PurchaseOrder>{

  constructor(public http: HttpClient) {
    super(http, 'purchase-orders', new PurchaseOrderAdapter());
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
