import {BaseApiResource} from './base-api-resource';

export class Application extends BaseApiResource {
    public static PERMISSION_READ = 1;
    public static PERMISSION_WRITE = 2;
    public static PERMISSION_ADMIN = 3;

    public static MODULE_USERS = 1;
    public static MODULE_COMPANIES = 2;
    public static MODULE_ROLES = 3;

    name: string;
    icon: string;
    pivot?: ApplicationPivot;
}

export class ApplicationPivot extends BaseApiResource {
    role_id: number;
    application_id: number;
    permission_id: number;
}