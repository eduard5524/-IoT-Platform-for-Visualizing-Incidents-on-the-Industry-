import {BaseApiResource} from '../api/base-api-resource';

export class BaseAdapter<T extends BaseApiResource> {

    /**
     * Override for custom parser
     * @param json {}
     */
    fromJson(json): T {
        const result: T = {} as T;
        for (const key of Object.keys(json)) {
            result[key] = json[key];
        }

        return result;
    }

    /**
     * Override for custom parser
     * @param resource adapter type
     */
    toJson(resource: T): any {
        return resource;
    }
}
