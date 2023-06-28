import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionService } from '../../../services/session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Company } from '../../../models/api/company';
import { CompaniesService } from '../../../services/General/companies.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { Constants } from '../../../helpers/constants';
import { CompanyDialogComponent } from '../../General/companies/modals/company-dialog/company-dialog.component';
import { MatDialog } from '@angular/material';
import { UserDialogComponent } from '../../General/users/modals/user-dialog/user-dialog.component';
import { UserContainerComponent } from '../../General/users/user-container/user-container.component';
import { RolesService } from '../../../services/roles.service';
import { BaseModulesComponent } from '../../base-modules.component';
import { RolesDialogComponent } from '../../General/roles/modals/roles-dialog/roles-dialog.component';
import { SidenavMfcComponent } from '../sidenav-neuraflow/sidenav-neuraflow.component';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss', './sidenav.component.css']
})
export class SidenavComponent extends BaseModulesComponent implements OnInit {

    public companies: Company[];
    public email: string;
    public company_name: string;
    public role: string;
    public option: number;
    public skin: number;
    public action: number;
    public application: number;

    @ViewChild('user_container') userContainer: UserContainerComponent;

    constants = Constants;

    constructor(public translate: TranslateService,
        public sessionService: SessionService,
        private authService: AuthenticationService,
        private companyService: CompaniesService,
        public rolesService: RolesService,
        private router: Router,
        private route: ActivatedRoute,
        private dialog: MatDialog) {
        super(rolesService, sessionService);
    }

    ngOnInit() {
        super.ngOnInit();
        this.route.data.subscribe(data => {
            this.skin = data['skin'];
            this.option = data['option'];
            this.application = data['application'];
        });
console.log("OPTION: " + this.option);
        if (this.skin == Constants.DARK_MODE_ON) {
            $('body').addClass('dark_skin');
        } else {
            $('body').removeClass('dark_skin');
        }

        console.log(this.skin);

        this.requestData();

        this.companyService.shouldUpdateObservable().subscribe(() => {
            this.requestData();
            this.email = this.sessionService.getUserEmail();
            this.role = this.sessionService.getUserRol();
        });

        this.goHome();

    }

    toggleSkin() {
        $(".dark_mode, .light_mode").toggleClass('d-none');
        $('body').toggleClass('dark_skin');
        if ($('body').hasClass('dark_skin')) {
            this.skin = Constants.DARK_MODE_ON;
            console.log('dark mode on');
        } else {
            this.skin = Constants.DARK_MODE_OFF;
            console.log('dark mode off');
        }

    }

    switchOption(event) {
        this.option = event;
        console.log(this.option);
    }



    switchApplication(application) {
        this.application = application;
        this.goHome();
        console.log(this.application);
    }

    goHome() {
        this.option = 0;
        console.log(this.application);
    }

    requestData() {
        this.companyService.list().subscribe(data => {
            this.companies = data;
            for (const company of this.companies) {
                if (company.id === this.sessionService.getCompanyId()) {
                    this.company_name = company.name;
                }
            }
        });
    }

    switchLanguage(lang: string) {
        this.translate.use(lang);
    }

    currentLanguage(): string {
        return this.translate.currentLang;
    }

    switchCompany(company: Company) {
        this.authService.changeCompany(company.id).subscribe();
    }

    currentCompanyId(): number {
        return this.sessionService.getCompanyId();
    }

    goSettings() {
        // TODO:
    }

    logout() {
        this.authService.logout();
    }

    onClickNewUser() {
        this.option = Constants.OPTION_USER;
        this.dialog.open(UserDialogComponent, {
            width: '600px'
        });
    }

    onClickNewCompany() {
        this.option = Constants.OPTION_COMPANY;
        this.dialog.open(CompanyDialogComponent, {
            width: '600px'
        });
    }

    onClickNewRole() {
        this.option = Constants.OPTION_ROLE;
        this.dialog.open(RolesDialogComponent, {
            width: '600px'
        });
    }
}
