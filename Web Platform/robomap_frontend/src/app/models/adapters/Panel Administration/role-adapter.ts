import {BaseAdapter} from '../base-adapter';
import {Role} from '../../api/role';
import {ModuleAdapter} from '../module-adapter';

export class RoleAdapter extends BaseAdapter<Role> {

    private moduleAdapter: ModuleAdapter;


    constructor() {
        super();
        this.moduleAdapter = new ModuleAdapter();
    }

    fromJson(json): Role {
        const result: Role = {} as Role;
        for (const key of Object.keys(json)) {
            if (key !== 'modules') {
                result[key] = json[key];
            } else {
                result[key] = json[key].map((item: any) => {
                    return this.moduleAdapter.fromJson(item);
                });
            }
        }

        return result;
    }
}
