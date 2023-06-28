import {BaseApiResource} from './base-api-resource';

export class Alarm extends BaseApiResource {
    location: string;
    device: string;
    id_alarm: string;
    id_traduction: number;
    valor: number;
    severity: number;
    state: number;
    created_at: string;
    updated_at: string;
    description: string;

}
