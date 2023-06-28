import {Injectable} from '@angular/core';
import {BaseHttpService} from '../base-http.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Company} from '../../models/api/company';
import {CompanyAdapter} from '../../models/adapters/Panel Administration/company-adapter';

@Injectable({
    providedIn: 'root'
})
export class CompaniesService extends BaseHttpService<Company> {

    constructor(http: HttpClient) {
        super(http, 'companies', new CompanyAdapter());
    }

    public list(query?: string): any {
        let params = new HttpParams();
        if (query != null) {
            params = params.set('query', query);
        }
        return super._list(params);
    }

    public getParents(query?: string, parents?: boolean): any {
        let params = new HttpParams();
        if (query != null) {
            params = params.set('query', query);
        }
        if (parents !== null) {
            if (parents === true) {
                params = params.set('parents', true.toString());
            } else {
                params = params.set('parents', false.toString());
            }
        }
        return super._list(params);
    }
}
