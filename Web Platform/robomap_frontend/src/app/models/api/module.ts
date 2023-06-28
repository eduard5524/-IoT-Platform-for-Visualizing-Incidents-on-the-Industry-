import {BaseApiResource} from './base-api-resource';

export class Module extends BaseApiResource {
    public static PERMISSION_READ = 1;
    public static PERMISSION_WRITE = 2;
    public static PERMISSION_ADMIN = 3;

    public static MODULE_USERS = 1;
    public static MODULE_COMPANIES = 2;
    public static MODULE_ROLES = 3;

    name: string;
    icon: string;
    application: string;
    pivot?: ModulePivot;
}

export class ModulePivot extends BaseApiResource {
    role_id: number;
    module_id: number;
    company_id: number;
    permission_id: number;
}
