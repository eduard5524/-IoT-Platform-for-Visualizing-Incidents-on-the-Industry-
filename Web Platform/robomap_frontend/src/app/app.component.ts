import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
/**
 * This Main Component contains the router outlet.
 * This router outlet is the scene plot where our SPA shows the features.
 */

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    /**
     * This is the main Title of Application. This title is shown in the browser tab.
     */
    title = 'mim-frontend';

    constructor(translate: TranslateService) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('en');
    }
}
