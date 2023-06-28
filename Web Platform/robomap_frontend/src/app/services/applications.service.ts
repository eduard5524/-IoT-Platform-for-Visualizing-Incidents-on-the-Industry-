import {Injectable} from '@angular/core';
import {BaseHttpService} from './base-http.service';
import {Application} from '../models/api/application';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApplicationAdapter} from '../models/adapters/application-adapter';

@Injectable({
    providedIn: 'root'
})
export class ApplicationsService extends BaseHttpService<Application> {

    constructor(http: HttpClient) {
        super(http, 'applications', new ApplicationAdapter());
    }

    public list(): any {
        const params = new HttpParams();
        return super._list(params);
    }
}
