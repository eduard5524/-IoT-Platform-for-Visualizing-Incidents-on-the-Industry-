import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {UserDialogComponent} from '../modals/user-dialog/user-dialog.component';
import {MatDialog} from '@angular/material';
import {Constants} from '../../../../helpers/constants';
import {User} from '../../../../models/api/user';

@Component({
    selector: 'app-user-container',
    templateUrl: './user-container.component.html',
    styleUrls: ['./user-container.component.css']
})
export class UserContainerComponent implements OnInit {

    @Input() action: number;

    constructor() {
    }

    ngOnInit() {

    }
}
