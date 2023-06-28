import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Company} from '../../../../../models/api/company';
import {CompaniesService} from '../../../../../services/General/companies.service';
import {BaseModulesComponent} from '../../../../base-modules.component';
import {RolesService} from '../../../../../services/roles.service';
import {SessionService} from '../../../../../services/session.service';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';

@Component({
    selector: 'app-new-company',
    templateUrl: './company-dialog.component.html',
    styleUrls: ['../../../../../../assets/styles/tables-global-styles.css']
})
export class CompanyDialogComponent extends BaseModulesComponent implements OnInit {

    public parentCompanies: Company[];
    public company: Company;
    public edit: boolean;
    public create: boolean;

    private mobileLayout: boolean;

    constructor(public dialogRef: MatDialogRef<CompanyDialogComponent>,
                private companyService: CompaniesService,
                public rolesService: RolesService,
                public sessionService: SessionService,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private breakPointObserver: BreakpointObserver) {
        super(rolesService, sessionService);

        breakPointObserver
            .observe(['(max-width: 1023px)'])
            .subscribe((state: BreakpointState) => {
                if (state.matches) {
                    this.mobileLayout = true;
                } else {
                    this.mobileLayout = false;
                }
            });

        if (data != null) {
            this.company = data.company;
            this.edit = data.edit;
            this.create = false;
        } else {
            this.company = new Company();
            this.edit = true;
            this.create = true;
        }
    }

    ngOnInit(): void {
        super.ngOnInit();
       // this.getParents();
    }

    getParents() {
        this.companyService.getParents(null, true).subscribe(parents => {
            this.parentCompanies = parents;
        });
    }

    onCreateClick(): void {
        if (this.create) {
            this.companyService.post(this.company).subscribe(() => {
                this.dialogRef.close();
            });
        } else {
            this.companyService.put(this.company).subscribe(() => {
                this.dialogRef.close();
            });
        }
    }

    onClickEdit(): void {
        this.edit = true;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    mobileClass(element: string): string {
        switch (element) {
            case 'field':
                if (this.mobileLayout) {
                    return 'full';
                }
                return 'medium';
            case 'button':
                if (this.mobileLayout) {
                    return 'button-mobile';
                }
                return '';
            default:
                break;
        }
    }
}
