import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../../models/api/product';
import { ProductAdapter } from '../../models/adapters/Neuracore/product-adapter';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseHttpService<Product>{

  constructor(public http: HttpClient) {
    super(http, 'products', new ProductAdapter());
  }



  public list(query?: string): any {
    const params = new HttpParams();
    if (query != null) {
      params.set('query', query);
    }
    return super._list(params);
  }
}
