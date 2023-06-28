import { Injectable } from '@angular/core';
import {BaseHttpService} from './base-http.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UserAdapter} from '../models/adapters/Panel Administration/user-adapter';
import {User} from '../models/api/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseHttpService<User> {

    constructor(http: HttpClient) {
        super(http, 'users', new UserAdapter());
    }

    public list(query?: string): any {
        const params = new HttpParams();
        if (query != null) {
            params.set('query', query);
        }
        return super._list(params);
    }

    public getUserData(id: number): any {
       return this.http.get('http://localhost:8000/api/users/data/' + id);
    }
}
