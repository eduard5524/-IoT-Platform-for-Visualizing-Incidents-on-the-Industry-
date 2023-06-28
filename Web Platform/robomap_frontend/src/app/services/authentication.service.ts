import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SessionService} from './session.service';
import {tap} from 'rxjs/operators';
import {Md5} from 'md5-typescript';
import {AuthResponse} from '../models/responses/auth-response';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {CompaniesService} from './General/companies.service';
import {ModulesService} from './modules.service';
import {RolesService} from './roles.service';
import {UsersService} from './users.service';

/**
 * This authentication service protect angular components and routes from unauthorized access.
 * @param TOKEN_NAME constant used in several methods to name the localStorage variable.
 */
@Injectable({providedIn: 'root'})
export class AuthenticationService {

    protected url: string;

    constructor(
        private http: HttpClient,
        private sessionService: SessionService,
        private companyService: CompaniesService,
        private modulesService: ModulesService,
        private rolesService: RolesService,
        private usersService: UsersService,
        private router: Router
    ) {
        this.url = environment.api + 'auth/';
    }

    /**
     * Outcall to API verifing user and password
     */
    login(email: string, password: string) {
        return this.http.post<AuthResponse>(
            this.url + 'login',
            {email: email, password: password}
        ).pipe(
            tap(
                data => {
                    console.log(data);
                    this.sessionService.saveToken(data.token);
                    this.sessionService.saveRefresh(data.refreshToken);
                }
            )
        );
    }

    /**
     * Remove user from local storage to log user outcall to API verifing user and password
     */
    logout() {
        this.sessionService.deleteToken();
        this.sessionService.deleteRefresh();
        this.router.navigate(['login']);
    }

    refreshToken() {
        return this.http.post<AuthResponse>(
            this.url + 'refresh',
            {'token': this.sessionService.getToken(), 'refreshToken': this.sessionService.getRefresh()}
            ).pipe(
            tap(
                data => {
                    this.sessionService.saveToken(data.token);
                    this.sessionService.saveRefresh(data.refreshToken);
                }
            )
        );
    }

    changeCompany(company_id: number) {
        return this.http.post<AuthResponse>(
            this.url + 'change-company',
            {id: company_id}
        ).pipe(
            tap(
                data => {
                    this.sessionService.saveToken(data.token);
                    this.sessionService.saveRefresh(data.refreshToken);
                    // Should refresh
                    this.companyService.setShouldUpdate();
                    this.modulesService.setShouldUpdate();
                    this.rolesService.setShouldUpdate();
                    this.usersService.setShouldUpdate();
                }
            )
        );
    }
}
