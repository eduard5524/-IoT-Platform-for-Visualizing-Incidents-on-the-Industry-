import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../../../models/api/user';
import { UsersService } from '../../../../../services/users.service';
import { RolesService } from '../../../../../services/roles.service';
import { Role } from '../../../../../models/api/role';
import { BaseModulesComponent } from '../../../../base-modules.component';
import { Observable } from 'rxjs';
import { SessionService } from '../../../../../services/session.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Company } from '../../../../../models/api/company';

@Component({
    selector: 'app-new-user-dialog',
    templateUrl: './user-dialog.component.html',
    styleUrls: ['../../../../../../assets/styles/tables-global-styles.css']
})
export class UserDialogComponent extends BaseModulesComponent implements OnInit {

    public userRole: string;
    public roles: Role[];
    public user: User;
    public edit: boolean;
    public create: boolean;
    public companies: Company[];

    private mobileLayout: boolean;

    constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
        private translate: TranslateService,
        private userService: UsersService,
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
            this.user = data.user;
            this.edit = data.edit;
            this.create = false;
        } else {
            this.user = new User();
            this.edit = true;
            this.create = true;
        }
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.requestData();
    }

    requestData() {
        this.rolesService.list().subscribe(data => {
            this.roles = data;
        });
    }

    onCreateClick(): void {
        console.log(this.user);
        if (this.create) {
            this.userService.post(this.user).subscribe(() => {
                this.dialogRef.close();
            });
        } else {
            this.userService.put(this.user).subscribe(() => {
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
}
