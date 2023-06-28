import { Injectable } from '@angular/core';
import {BaseHttpService} from './base-http.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RoleAdapter} from '../models/adapters/Panel Administration/role-adapter';
import {Role} from '../models/api/role';
import {Observable, Subject} from 'rxjs';
import {SessionService} from './session.service';
import {Module} from '../models/api/module';

@Injectable({
  providedIn: 'root'
})

export class RolesService extends BaseHttpService<Role> {

    constructor(http: HttpClient,
                private sessionService: SessionService) {
        super(http, 'roles', new RoleAdapter());
    }

    public list(query?: string): any {
        const params = new HttpParams();
        if (query != null) {
            params.set('query', query);
        }
        return super._list(params);
    }


    /**
     * @param module_id
     */
    public canRead(module_id: number): Observable<boolean> {
        const subject = new Subject<boolean>();
        const role_id = this.sessionService.getUserRolId();

        this.get(role_id).subscribe((data: Role) => {
            for (const module of data.modules) {
                if (module.id === module_id) {
                    if (module.pivot != null && module.pivot.permission_id >= Module.PERMISSION_READ) {
                        subject.next(true);
                        return;
                    }
                }
            }
            subject.next(false);
        });
        return subject.asObservable();
    }

    /**
     * @param module_id
     */
    public canWrite(module_id: number): Observable<boolean> {
        const subject = new Subject<boolean>();
        const role_id = this.sessionService.getUserRolId();

        this.get(role_id).subscribe((data: Role) => {
            for (const module of data.modules) {
                if (module.id === module_id) {
                    if (module.pivot != null && module.pivot.permission_id >= Module.PERMISSION_WRITE) {
                        subject.next(true);
                        return;
                    }
                }
            }
            subject.next(false);
        });
        return subject.asObservable();
    }

    /**
     * @param module_id
     */
    public canAdmin(module_id: number): Observable<boolean> {
        const subject = new Subject<boolean>();
        const role_id = this.sessionService.getUserRolId();

        this.get(role_id).subscribe((data: Role) => {
            for (const module of data.modules) {
                if (module.id === module_id) {
                    if (module.pivot != null && module.pivot.permission_id === Module.PERMISSION_ADMIN) {
                        subject.next(true);
                        return;
                    }
                }
            }
            subject.next(false);
        });
        return subject.asObservable();
    }
}
