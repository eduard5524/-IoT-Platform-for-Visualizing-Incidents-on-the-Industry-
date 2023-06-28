import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Device } from '../../models/api/device';
import { DeviceAdapter } from '../../models/adapters/Neuraflow/device-adapter';


@Injectable({
  providedIn: 'root'
})
export class DevicesService extends BaseHttpService<Device>{

  constructor(public http: HttpClient) {
    super(http, 'devices', new DeviceAdapter());
  }

  public list(query?: string): any {
    const params = new HttpParams();
    if (query != null) {
      params.set('query', query);
    }
    return super._list(params);
  }

}
