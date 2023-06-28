import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

/**
 * Manage error if API returns 401 response. If API fails force the logout and return error
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(err => {
                if (err instanceof HttpErrorResponse) {
                    if ((<HttpErrorResponse>err).status === 401) {
                        return throwError(err);
                    }
                }
                // TODO:
                return throwError(err);
            }));
    }
}
