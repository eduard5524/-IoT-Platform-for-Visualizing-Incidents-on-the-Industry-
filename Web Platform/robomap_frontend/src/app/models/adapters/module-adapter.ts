import {BaseAdapter} from './base-adapter';
import {Module, ModulePivot} from '../api/module';

export class ModuleAdapter extends BaseAdapter<Module> {

    private modulePivotAdapter: ModulePivotAdapter;


    constructor() {
        super();
        this.modulePivotAdapter = new ModulePivotAdapter();
    }

    fromJson(json): Module {
        const result: Module = {} as Module;
        for (const key of Object.keys(json)) {
            if (key !== 'pivot') {
                result[key] = json[key];
            } else {
                result[key] = this.modulePivotAdapter.fromJson(json[key]);
            }
        }

        return result;
    }
}

export class ModulePivotAdapter extends BaseAdapter<ModulePivot> {

}
