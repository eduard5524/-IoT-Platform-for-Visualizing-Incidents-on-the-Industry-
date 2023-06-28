import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HistoricalAlarmActive } from '../../models/api/historical-alarm-active';
import { HistoricalAlarmActiveAdapter } from '../../models/adapters/Neuraflow/historical-alarm-active-adapter';


@Injectable({
  providedIn: 'root'
})
export class HistoricalAlarmService extends BaseHttpService<HistoricalAlarmActive>{

  constructor(public http: HttpClient) {
    super(http, 'historical-alarm-active', new HistoricalAlarmActiveAdapter());
  }



  public list(query?: string): any {
    const params = new HttpParams();
    if (query != null) {
      params.set('query', query);
    }
    return super._list(params);
  }

}
