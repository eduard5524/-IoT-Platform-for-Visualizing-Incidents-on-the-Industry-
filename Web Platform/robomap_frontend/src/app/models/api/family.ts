import { BaseApiResource } from './base-api-resource';

export class Family extends BaseApiResource {
    name: string;
    components: string;
    description: string;
    files: string;
}
