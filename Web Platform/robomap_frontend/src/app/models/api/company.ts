import {BaseApiResource} from './base-api-resource';

export class Company extends BaseApiResource {
    name: string;
    NIF: string;
    email: string;
    address: string;
    phone: string;
    user_id: number;
}
