import { BaseApiResource } from './base-api-resource';

export class WarehouseLocation extends BaseApiResource {
    company_id: number;
    name: string;
    address: string;
    country: string;
    city: string;
    postal_code: string;
    contact_name: string;
    contact_phone: string;
    contact_email: string;

}
