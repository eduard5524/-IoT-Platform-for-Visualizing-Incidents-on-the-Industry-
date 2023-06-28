import { BaseApiResource } from './base-api-resource';

export class Provider extends BaseApiResource {
    name: string;
    vat: string;
    address: string;
    country: string;
    phone: string;
    email: string;
    price_this_prod?: number;
    iva_this_prod?: number;

}
