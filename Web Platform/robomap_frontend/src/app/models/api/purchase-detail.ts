import { BaseApiResource } from './base-api-resource';

export class PurchaseDetail extends BaseApiResource {
    component: string;
    ref_component: string;
    order_num: string;
    state: number;
    project_num: string;
    ref_num: string;
    quantity: number;
    provider: string;
    note: string;

}
