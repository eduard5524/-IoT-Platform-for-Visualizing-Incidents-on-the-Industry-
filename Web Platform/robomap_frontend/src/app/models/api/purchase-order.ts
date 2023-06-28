import { BaseApiResource } from './base-api-resource';
import { StringMap } from '@angular/core/src/render3/jit/compiler_facade_interface';

export class PurchaseOrder extends BaseApiResource {
    project_num: string;
    ref_number: string;
    date: string;
    document: string;
    company_shipto: string;
    address_shipto: string;
    country_shipto: string;
    phone_shipto: string;
    email_shipto: string;
    vat_shipto: string;
    provider: number;
    company_billto: string;
    address_billto: string;
    country_billto: string;
    phone_billto: string;
    email_billto: string;
    vat_billto: string;
    items: string;
    total_price: string;
    state: string;
    order_num: string;

}
