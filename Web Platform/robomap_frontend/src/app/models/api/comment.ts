import { BaseApiResource } from './base-api-resource';

export class Comment extends BaseApiResource {
    id_user: number;
    comment: string;
    id_alarm: string;
    created_at: string;
    updated_at: string;
    username: string;
}
