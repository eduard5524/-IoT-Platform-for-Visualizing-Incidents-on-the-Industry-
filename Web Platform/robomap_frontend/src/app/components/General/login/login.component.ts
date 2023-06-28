import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {SessionService} from '../../../services/session.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {MatSnackBar} from '@angular/material';
import {UsersService} from '../../../services/users.service';

/**
 * The Login component
 */
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    returnUrl: string;
    verToken = '';
    hide = true;

    constructor(public translate: TranslateService,
                private route: ActivatedRoute,
                private router: Router,
                private auth: AuthenticationService,
                private snackBar: MatSnackBar,
                private sessionService: SessionService,
                private userService: UsersService) {
    }

    @ViewChild('user') user: ElementRef;
    @ViewChild('password') password: ElementRef;

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        if (this.sessionService.getToken() != null) {
            this.router.navigate(['']);
        }

    }

    doLogin() {
        const user = this.user.nativeElement.value;
        const password = this.password.nativeElement.value;

        if (user === '') {
            const mensaje = this.translate.instant('generic_error_empty_param', {value : 'username'});
            this.snackBar.open(mensaje);
        } else if (password === '') {
            const mensaje = this.translate.instant('generic_error_empty_param', {value : 'password'});
            this.snackBar.open(mensaje);
        } else {
            this.auth.login(user, password).subscribe(data => {
                this.router.navigate(['/']);
            }, error => {
                const mensaje = this.translate.instant('LOGIN.error');
                this.snackBar.open(mensaje);
            });
        }
    }

    goResetPassword() {
        // TODO:
        // this.router.navigate(['reset-password']);
    }
}

