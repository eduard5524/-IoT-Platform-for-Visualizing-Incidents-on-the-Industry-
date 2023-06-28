import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Role } from '../../../../../models/api/role';
import { ModulesService } from '../../../../../services/modules.service';
import { ApplicationsService } from '../../../../../services/applications.service';
import { CompaniesService } from '../../../../../services/General/companies.service';
import { Module, ModulePivot } from '../../../../../models/api/module';
import { Company } from '../../../../../models/api/company';
import { Application, ApplicationPivot } from '../../../../../models/api/application';
import { SessionService } from '../../../../../services/session.service';
import { BaseModulesComponent } from '../../../../base-modules.component';
import { RolesService } from '../../../../../services/roles.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
    selector: 'app-roles-dialog',
    templateUrl: './roles-dialog.component.html',
    styleUrls: ['../../../../../assets/styles/tables-global-styles.css']
})
export class RolesDialogComponent extends BaseModulesComponent implements OnInit {

    public role: Role;
    public edit: boolean;
    public create: boolean;

    private mobileLayout: boolean;

    public modules: Module[];
    public companies: Company[];
    public applications: Application[];

    public PERMISSION_READ = Module.PERMISSION_READ;
    public PERMISSION_WRITE = Module.PERMISSION_WRITE;
    public PERMISSION_ADMIN = Module.PERMISSION_ADMIN;

    constructor(public dialogRef: MatDialogRef<RolesDialogComponent>,
        public translate: TranslateService,
        public roleService: RolesService,
        public companiesService: CompaniesService,
        public sessionService: SessionService,
        private modulesService: ModulesService,
        private applicationsService: ApplicationsService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private breakPointObserver: BreakpointObserver) {
        super(roleService, sessionService);

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
            this.role = Object.assign({}, data.role);
            this.role.modules = data.role.modules.map(x => Object.assign({}, x));
            this.edit = data.edit;
            this.create = false;
        } else {
            this.role = new Role();
           // this.role.company_id = this.sessionService.getCompanyId();
            this.edit = true;
            this.create = true;
        }
    }

    ngOnInit() {
        super.ngOnInit();
        this.modulesService.list().subscribe(data => {
            console.log(data);
            this.modules = data;
        });

        this.companiesService.list().subscribe(data => {
            console.log(data);
            this.companies = data;
        });

        this.applicationsService.list().subscribe(data => {
            console.log(data);
            this.applications = data;
        });
    }

    addPermissionBlock() {
        var block = $("#original-permission-block .permission-block").html();
        $(".permission-clone").append('<div class="row">' + block + '</div>');
    }

    onCreateClick() {
        if (this.create) {
            this.roleService.post(this.role).subscribe(() => {
                this.dialogRef.close();
            });
        } else {
            this.roleService.put(this.role).subscribe(() => {
                this.dialogRef.close();
            });
        }
    }

    onClickEdit() {
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

    getRoleModulePermissionId(module: Module): number {
        if (this.role.modules != null) {
            for (const tmp of this.role.modules) {
                if (tmp.id === module.id) {
                    return tmp.pivot.permission_id;
                }
            }
        }
        return null;
    }

    onChangeModule(event: number, module: Module) {
        if (this.role.modules == null) {
            this.role.modules = [];
        }
        let found = false;
        for (const tmp of this.role.modules) {
            if (tmp.id === module.id) {
                if (tmp.pivot == null) {
                    tmp.pivot = new ModulePivot();
                }
                tmp.pivot.permission_id = event;
                tmp.pivot.role_id = this.role.id;
                tmp.pivot.module_id = tmp.id;
                found = true;
            }
        }
        if (!found) {
            const tmp = new Module();
            tmp.id = module.id;
            tmp.name = module.name;
            tmp.pivot = new ModulePivot();
            tmp.pivot.permission_id = event;
            tmp.pivot.role_id = this.role.id;
            tmp.pivot.module_id = tmp.id;
            this.role.modules.push(tmp);
        }
    }
}
