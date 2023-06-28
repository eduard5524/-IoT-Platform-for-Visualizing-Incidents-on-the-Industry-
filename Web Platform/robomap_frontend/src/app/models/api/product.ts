import { BaseApiResource } from './base-api-resource';

export class Product extends BaseApiResource {
    title: string;
    description: string;
    imageLink: string;
    madeIn: string;
    quantity: number;
    category: string;
    codigo_articulo: string;
    warehouse: number;
    provider: string;
    manufacturer: number;
    tech_sheet: string;
    price?: number;
    price_sin_iva?:number;
    vat?: number;
    prices: string;

}
