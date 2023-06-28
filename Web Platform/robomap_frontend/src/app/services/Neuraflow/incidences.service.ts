import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Alarm } from '../../models/api/alarm';
import { AlarmAdapter } from '../../models/adapters/Neuraflow/incidence-adapter';


@Injectable({
  providedIn: 'root'
})
export class AlarmsService extends BaseHttpService<Alarm>{

  constructor(public http: HttpClient) {
    super(http, 'alarms', new AlarmAdapter());
  }

  public list(query?: string): any {
    const params = new HttpParams();
    if (query != null) {
      params.set('query', query);
    }
    return super._list(params);
  }

}
