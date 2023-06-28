import {BaseApiResource} from './base-api-resource';

export class Manufacturer extends BaseApiResource {
    name: string;
    vat: string;
    address: string;
    country: string;
    phone: string;
    email: string;
}
