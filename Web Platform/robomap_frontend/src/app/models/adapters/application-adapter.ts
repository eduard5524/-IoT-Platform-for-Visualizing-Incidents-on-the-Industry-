import {BaseAdapter} from './base-adapter';
import {Application, ApplicationPivot} from '../api/application';

export class ApplicationAdapter extends BaseAdapter<Application> {

    private applicationPivotAdapter: ApplicationPivotAdapter;


    constructor() {
        super();
        this.applicationPivotAdapter = new ApplicationPivotAdapter();
    }

    fromJson(json): Application {
        const result: Application = {} as Application;
        for (const key of Object.keys(json)) {
            if (key !== 'pivot') {
                result[key] = json[key];
            } else {
                result[key] = this.applicationPivotAdapter.fromJson(json[key]);
            }
        }

        return result;
    }
}

export class ApplicationPivotAdapter extends BaseAdapter<ApplicationPivot> {

}
