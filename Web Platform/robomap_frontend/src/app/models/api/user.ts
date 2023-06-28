/**
 * This class defines the USER MODEL.
 */
import { BaseApiResource } from './base-api-resource';

export class User extends BaseApiResource {
    /**
     * @param name user name
     * @param email user email
     * @param role user rol. May be admin ou user
     * @param telephone user telephone
     */
    name: string;
    surname: string;
    email: string;
    role_id: number;
    role_name: string;
    phone: string;
    superuser_parent: number;
    prefered_language: string;
    user_photo: string;
    prefered_skin: string;
}
