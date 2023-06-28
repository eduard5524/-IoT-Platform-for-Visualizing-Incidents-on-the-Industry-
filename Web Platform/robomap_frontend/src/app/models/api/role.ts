import {BaseApiResource} from './base-api-resource';
import {Module} from './module';
import {Company} from './company';

export class Role extends BaseApiResource {
    name: string;
    description: string;
    modules?: Module[];
    organizations?: Company[];
}
