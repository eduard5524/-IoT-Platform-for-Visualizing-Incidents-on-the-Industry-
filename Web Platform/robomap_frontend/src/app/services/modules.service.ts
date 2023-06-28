import {Injectable} from '@angular/core';
import {BaseHttpService} from './base-http.service';
import {Module} from '../models/api/module';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ModuleAdapter} from '../models/adapters/module-adapter';

@Injectable({
    providedIn: 'root'
})
export class ModulesService extends BaseHttpService<Module> {

    constructor(http: HttpClient) {
        super(http, 'modules', new ModuleAdapter());
    }

    public list(): any {
        const params = new HttpParams();
        return super._list(params);
    }
}
