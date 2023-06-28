import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Category } from '../../models/api/category';
import { CategoryAdapter } from '../../models/adapters/category-adapter';
import { SessionService } from '../session.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends BaseHttpService<Category> {
    constructor(http: HttpClient,
    private sessionService: SessionService) {
    super(http, 'categories', new CategoryAdapter());
}

  public list(query?: string): any {
    const params = new HttpParams();
    if (query != null) {
        params.set('query', query);
    }
    return super._list(params);
}
}
