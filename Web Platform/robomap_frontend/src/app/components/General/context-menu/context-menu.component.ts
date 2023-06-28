import {Component, HostBinding, HostListener} from '@angular/core';
import {MatMenuTrigger} from '@angular/material';

@Component({
    selector: 'app-context-menu',
    template: '<ng-content></ng-content>',
    styles: ['']
})
export class ContextMenuComponent extends MatMenuTrigger {

    @HostBinding('style.position') private position = 'fixed';
    @HostBinding('style.left') private x: string;
    @HostBinding('style.top') private y: string;

    // Intercepts the global context menu event
    // @HostListener('document:contextmenu', ['$event'])
    // private close() {
    //     if (this.menuOpen) {
    //         this.closeMenu();
    //     }
    // }

    public open(ev: MouseEvent) {
        ev.preventDefault();
        // Closes the menu when already opened
        if (this.menuOpen) {
            this.closeMenu();
        } else {

            // Adjust the menu anchor position
            this.x = ev.clientX + 'px';
            this.y = ev.clientY + 'px';

            // Opens the menu
            this.openMenu();
        }
        // prevents default
        return false;
    }
}
