import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PurchaseDetail } from '../../models/api/purchase-detail';
import { PurchaseDetailAdapter } from '../../models/adapters/Neuracore/purchase-detail-adapter';

@Injectable({
  providedIn: 'root'
})
export class PurchaseDetailService extends BaseHttpService<PurchaseDetail>{

  constructor(public http: HttpClient) {
    super(http, 'purchase-detail', new PurchaseDetailAdapter());
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
