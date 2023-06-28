import { BaseApiResource } from './base-api-resource';

export class HistoricalAlarmActive extends BaseApiResource {

    id_alarm: string;
    id_user_acknow: number;
    created_at: string;
    updated_at: string;
}
