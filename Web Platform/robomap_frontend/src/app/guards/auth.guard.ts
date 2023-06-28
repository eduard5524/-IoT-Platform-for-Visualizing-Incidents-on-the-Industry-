import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {SessionService} from '../services/session.service';

/**
 * This Guard verify if the routes are protected. In the routing file,
 * you can set AuthGuard->activated to grant access to routes only to logged users
 */
@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private sessionService: SessionService) {
    }

    /**
     * desc
     * @param route injects the routing. For protected routes Activate
     * @param state injects the routing State
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.sessionService.getToken() != null) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        return false;
    }
}
