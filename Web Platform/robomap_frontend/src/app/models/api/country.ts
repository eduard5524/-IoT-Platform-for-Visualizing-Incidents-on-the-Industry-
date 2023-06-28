import { BaseApiResource } from './base-api-resource';

export class Country extends BaseApiResource {
        code: string;
        active: boolean;
        name: string;
        slug: string;
}
