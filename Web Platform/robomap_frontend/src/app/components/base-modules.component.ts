import {RolesService} from '../services/roles.service';
import {share} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {OnInit} from '@angular/core';
import {SessionService} from '../services/session.service';
import {Role} from '../models/api/role';
import {Module} from '../models/api/module';

export abstract class BaseModulesComponent implements OnInit {

    private permissions: number[];

    public MODULE_USERS = Module.MODULE_USERS;
    public MODULE_COMPANIES = Module.MODULE_COMPANIES;
    public MODULE_ROLES = Module.MODULE_ROLES;

    protected constructor(protected rolesService: RolesService,
                          protected sessionService: SessionService) {}

    ngOnInit(): void {
        this.permissions = [];
        this.requestRole();
    }

    requestRole() {
        const role_id = this.sessionService.getUserRolId();
console.log(role_id);
        this.rolesService.get(role_id).subscribe((data: Role) => {
            for (const module of data.modules) {
                if (module.pivot != null) {
                    this.permissions[module.id] = module.pivot.permission_id;
                } else {
                    this.permissions[module.id] = null;
                }
            }
        });
    }

    public canRead(module_id: number): boolean {
        if (this.permissions != null) {
            return this.permissions[module_id] != null && this.permissions[module_id] >= Module.PERMISSION_READ;
        }
        return false;
    }

    public canWrite(module_id: number): boolean {
        if (this.permissions != null) {
            return this.permissions[module_id] != null && this.permissions[module_id] >= Module.PERMISSION_WRITE;
        }
        return false;
    }

    public canAdmin(module_id: number): boolean {
        if (this.permissions != null) {
            return this.permissions[module_id] != null && this.permissions[module_id] == Module.PERMISSION_ADMIN;
        }
        return false;
    }
}
