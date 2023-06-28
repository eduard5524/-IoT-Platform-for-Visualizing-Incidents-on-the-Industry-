import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BaseAdapter} from '../models/adapters/base-adapter';
import {map, tap} from 'rxjs/operators';
import {BaseApiResource} from '../models/api/base-api-resource';

export class BaseHttpService<T extends BaseApiResource> {

    private messageShouldUpdate: BehaviorSubject<any> = new BehaviorSubject(null);

    protected url = environment.api;

    private headers;

    constructor(protected http: HttpClient,
                public controller: string,
                protected serializer: BaseAdapter<T>) {
        this.url = environment.api + controller;
    }

    public shouldUpdateObservable(): Observable<any> {
        return this.messageShouldUpdate.asObservable();
    }

    public setShouldUpdate() {
        this.createNoCacheHeader();
        this.messageShouldUpdate.next(null);
    }

    public createNoCacheHeader() {
        this.headers = new HttpHeaders({
            'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
            'Pragma': 'no-cache',
            'Expires': '0'
        });
    }

    public get(id: any): Observable<T> {
        return this.http.get<T>(this.url + '/' + id).pipe(
            map(data => this.serializer.fromJson(data) as T)
        );

    }


    /**
     * Override to customize params
     * @param params
     * @private
     */
    protected _list(params: HttpParams): Observable<T[]> {
        return this.http.get<T[]>(this.url, { params: params, headers: this.headers }).pipe(
            map((data: T[]) => {
                const a = data.map( (item) => {
                        return this.serializer.fromJson(item) as T;
                }) as T[];
                return a;
            }),
            tap(() => {
                this.headers = null;

            })
        );
    }

    public post(body: T): Observable<T> {
        return this.http.post(this.url, this.serializer.toJson(body)).pipe(
            map(data => this.serializer.fromJson(data) as T),
            tap(() => {
                this.setShouldUpdate();
            })
        );
    }

    public put(body: T): Observable<T> {
        return this.http.put(this.url, this.serializer.toJson(body)).pipe(
            map(data => this.serializer.fromJson(data) as T),
            tap(() => {
                this.setShouldUpdate();
            })
        );
    }

    public delete(id: number) {
        return this.http.delete(this.url + '/' + id).pipe(
            tap(() => {
                this.setShouldUpdate();
            })
        );
    }
}
