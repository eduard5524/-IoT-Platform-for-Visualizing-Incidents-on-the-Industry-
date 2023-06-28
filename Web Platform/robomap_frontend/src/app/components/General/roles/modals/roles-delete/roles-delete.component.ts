import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Role} from '../../../../../models/api/role';
import {RolesService} from '../../../../../services/roles.service';

@Component({
  selector: 'app-roles-delete',
  templateUrl: './roles-delete.component.html',
  styleUrls: ['./roles-delete.component.css']
})
export class RolesDeleteComponent implements OnInit {

    public role: Role;
    public rolesAvailable: Role[];

    private newRoleIsSelected: boolean;

    constructor(public dialogRef: MatDialogRef<RolesDeleteComponent>,
                private rolesService: RolesService,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        if (data != null) {
            this.role = data.role;
        }
    }

    ngOnInit() {
        this.rolesService.list().subscribe(data => {
            this.rolesAvailable = data;
        });
        this.newRoleIsSelected = false;
    }

    changeNewRole() {
        this.newRoleIsSelected = true;
    }

    isNewRoleSelected(): boolean {
        return this.newRoleIsSelected;
    }

    onDeleteClick(): void {
        this.rolesService.delete(this.role.id).subscribe(result => {
            this.dialogRef.close();
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
