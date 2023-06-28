import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Family } from '../models/api/family';
import { FamilyAdapter } from '../models/adapters/family-adapter';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class FamiliesService extends BaseHttpService<Family>{

  constructor(http: HttpClient,
    private sessionService: SessionService) {
    super(http, 'families', new FamilyAdapter());
  }

  public list(query?: string): any {
    const params = new HttpParams();
    if (query != null) {
        params.set('query', query);
    }
    return super._list(params);
}
}
