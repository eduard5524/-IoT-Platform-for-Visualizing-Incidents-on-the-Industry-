import { BaseApiResource } from './base-api-resource';

export class Device extends BaseApiResource {
    name: string;
    ip: string;
    port: string;
    protocol: string;
    state: string;
    created_at: string;
    updated_at: string;
}
