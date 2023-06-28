import {Injectable, Injector} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {SessionService} from '../services/session.service';
import {catchError, filter, finalize, switchMap, take} from 'rxjs/operators';
import {AuthResponse, STATUS_REFRESH_PASSWORD} from '../models/responses/auth-response';
import {AuthenticationService} from '../services/authentication.service';

/**
 * Opposed to the MVC proposal with private calls, we need to connect to a public API and it deserve a credentialed and secure call.
 We make this calls to API with a [JWT](https://jwt.io/) (JSON Web Token).
 Angular 6 has a method to intercept all the request and modify the http header authentication including the access token generated in an successful login call.
 A simple login form has two separated function:
 1. Verify user and password in DB
 2. Generate a JWT token

 Angular 6 distinguishes components from services to increase modularity and reusability. Components consume services, that is, you can inject a Service into a Component as a Dependency.
 For this reason you can found the Services in Injectables Section.
 To connect with API we use Service
 This Token will be included in all http headers
 *
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    private isRefreshingToken = false;
    private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private inj: Injector) {

    }

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {
        const auth = this.inj.get(SessionService);

        const array_excluded = [
            'api/auth/refresh',
            '/assets/'
        ];

        let found = false;
        for (const excluded of array_excluded) {
            found = found || (req.url.indexOf(excluded) > -1);
        }

        // Comporvem si la url és alguna de les excloses.
        if (found) {
            return next.handle(req);
        }

        // send the cloned request to the next handler.
        return next.handle(this.addToken(req, auth.getToken())).pipe(
            catchError((error) => {
                if (error instanceof HttpErrorResponse) {
                    if ((<HttpErrorResponse>error).status === 401) {
                        return this.handle401Error(req, next);
                    }
                }
                return throwError(error);
            }));
    }

    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({setHeaders: {Authorization: 'Bearer ' + token}});
    }

    handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        const session = this.inj.get(SessionService);
        const auth = this.inj.get(AuthenticationService);
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;

            // Reset here so that the following requests wait until the token
            // comes back from the refreshToken call.
            this.tokenSubject.next(null);

            return auth.refreshToken()
                .pipe(
                    switchMap((data: AuthResponse) => {
                        if (data) {
                            if (data.status != null) {
                                if (data.status === STATUS_REFRESH_PASSWORD) {
                                    // TODO:
                                } else {
                                    this.tokenSubject.next(null);
                                    return;
                                }
                            } else {
                                this.tokenSubject.next(data.token);
                                return next.handle(this.addToken(req, data.token));
                            }
                        }
                        return <any>auth.logout();
                    }),
                    catchError(err => {
                        this.tokenSubject.next(null);
                        return <any>auth.logout();
                    }),
                    finalize(() => {
                        this.isRefreshingToken = false;
                    })
                );
        } else {
            return this.tokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(token => {
                    return next.handle(this.addToken(req, token));
                })
            );
        }
    }
}
