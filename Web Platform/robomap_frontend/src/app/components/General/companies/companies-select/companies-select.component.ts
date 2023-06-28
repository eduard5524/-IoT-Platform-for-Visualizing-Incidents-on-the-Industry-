import {Component, OnInit} from '@angular/core';
import {MatTableDataSource, MatDialog} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {Company} from '../../../../models/api/company';
import {SessionService} from '../../../../services/session.service';
import {Router} from '@angular/router';
import {CompaniesService} from '../../../../services/General/companies.service';
import {CompanyDialogComponent} from '../modals/company-dialog/company-dialog.component';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {AuthenticationService} from '../../../../services/authentication.service';

@Component({
  selector: 'app-select-company',
  templateUrl: './companies-select.component.html',
  styleUrls: ['./companies-select.component.css']
})
export class CompaniesSelectComponent implements OnInit {

    public companiesDataSource = new MatTableDataSource<Company>();
    public displayedColumns: string[] = ['name'];
    private mobileLayout: boolean;

    constructor(public translate: TranslateService,
                private dialog: MatDialog,
                private sessionService: SessionService,
                private authService: AuthenticationService,
                private router: Router,
                private companyService: CompaniesService,
                private breakPointObserver: BreakpointObserver) {
        breakPointObserver
            .observe(['(max-width: 1023px)'])
            .subscribe((state: BreakpointState) => {
                if (state.matches) {
                    this.mobileLayout = true;
                } else {
                    this.mobileLayout = false;
                }
            });
    }

    ngOnInit() {
        this.listCompanies();

        this.companyService.shouldUpdateObservable().subscribe(() => {
            this.listCompanies();
        });
    }

    listCompanies() {
        this.companyService.list().subscribe(companies => {
            this.companiesDataSource.data = companies;
        });
    }

    onCompanySelected(company: Company) {
        this.authService.changeCompany(company.id).subscribe( () => {
            this.router.navigate(['']);
        });
    }

    openCreateNewCompany() {
        this.dialog.open(CompanyDialogComponent, {
            width: '600px',
        });
    }

    mobileClass(element: string): string {
        switch (element) {
            case 'companies-card':
                if (this.mobileLayout) {
                    return 'companies-card-mobile';
                }
                return 'companies-card';
            case 'actions-section':
                if (this.mobileLayout) {
                    return 'actions-section-mobile';
                }
                return 'actions-section';
            default:
                break;
        }
    }
}
