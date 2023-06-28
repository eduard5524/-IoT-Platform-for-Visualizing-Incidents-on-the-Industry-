import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    readonly USER_TOKEN = 'token';
    readonly USER_REFRESH = 'refresh';

    /**
     * @param tokenDeco Variable where the token decoded is stored.
     * You can get the Name and the Role from this decoded token.
     */
    tokenDeco: any;

    constructor(private jwtHelperService: JwtHelperService) {
        this.tokenDeco = this.jwtHelperService.decodeToken();
    }

    /** Token **/

    getToken(): string {
        return localStorage.getItem(this.USER_TOKEN);
    }

    getRefresh(): string {
        return localStorage.getItem(this.USER_REFRESH);
    }

    saveToken(token: string) {
        localStorage.setItem(this.USER_TOKEN, token);
    }

    saveRefresh(token: string) {
        localStorage.setItem(this.USER_REFRESH, token);
    }

    deleteToken() {
        localStorage.removeItem(this.USER_TOKEN);
    }

    deleteRefresh() {
        localStorage.removeItem(this.USER_REFRESH);
    }

    /**
     * Get the user Role form decoded token
     */
    getUserRol(): string {
        const token = this.jwtHelperService.decodeToken(this.getToken());
        return token.role_name;
    }

    /**
     * Get the user Name form decoded token
     */
    getUserEmail(): string {
        const token = this.jwtHelperService.decodeToken(this.getToken());
        return token.user_email;
    }

    getCompanyId(): number {
        const token = this.jwtHelperService.decodeToken(this.getToken());
        return token.company_id;
    }

    /**
     * Get the user Role Id from decoded token
     */
    getUserRolId(): number {
        const token = this.jwtHelperService.decodeToken(this.getToken());
        console.log(token);
        return token.role_id;
    }

    /**
     * Get the user Role Id from decoded token
     */
    getUserId(): number {
        const token = this.jwtHelperService.decodeToken(this.getToken());
        return token.user_id;
    }

}
