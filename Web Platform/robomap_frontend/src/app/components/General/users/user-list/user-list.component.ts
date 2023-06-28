import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../../models/api/user';
import {UsersService} from '../../../../services/users.service';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {ContextMenuComponent} from '../../../General/context-menu/context-menu.component';
import {UserDialogComponent} from '../modals/user-dialog/user-dialog.component';
import {UserDeleteComponent} from '../modals/user-delete/user-delete.component';
import {BaseModulesComponent} from '../../../base-modules.component';
import {RolesService} from '../../../../services/roles.service';
import {SessionService} from '../../../../services/session.service';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['../../../../../assets/styles/tables-global-styles.css']
})
export class UserListComponent extends BaseModulesComponent implements OnInit {

    private users: User[];
    public dataSource = new MatTableDataSource<User>();

    public columnsToDisplay: string[];
    private columnsToDisplayDesktop = ['check', 'edit', 'name', 'surname', 'email', 'phone', 'role', 'view'];
    private columnsToDisplayMobile  = ['check', 'edit', 'name', 'surname', 'role', 'view'];

    private mobileLayout: boolean;

    public pageSize = 25;
    public currentPage = 0;
    public totalSize = 0;
    public pageEvent: any;
    public array: any;

    @ViewChild(ContextMenuComponent)
    contextMenu: ContextMenuComponent;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public translate: TranslateService,
                private userService: UsersService,
                public rolesService: RolesService,
                public sessionService: SessionService,
                private dialog: MatDialog,
                private breakPointObserver: BreakpointObserver) {
        super(rolesService, sessionService);

        breakPointObserver
            .observe(['(max-width: 1023px)'])
            .subscribe((state: BreakpointState) => {
                if (state.matches) {
                    this.mobileLayout = true;
                    this.columnsToDisplay = this.columnsToDisplayMobile;
                } else {
                    this.mobileLayout = false;
                    this.columnsToDisplay = this.columnsToDisplayDesktop;
                }
            });
    }

    ngOnInit() {
        super.ngOnInit();
        this.dataSource.paginator = this.paginator;

        this.userService.shouldUpdateObservable().subscribe(() => {
            this.requestData();
        });

        this.requestData();
    }

    requestData() {
        this.userService.list().subscribe(data => {
            this.users = data;
            this.array = data;
            this.dataSource = new MatTableDataSource<User>(this.users);
        });
    }

    onRightClick(event: MouseEvent, user: User) {
        this.contextMenu.menuData = {'item': user};
        this.contextMenu.open(event);
    }

    openEditUser(user: User) {
        this.dialog.open(UserDialogComponent, {
            width: '600px',
            data: {user: user, edit: true}
        });
    }

    openViewUser(user: User) {
        this.dialog.open(UserDialogComponent, {
            width: '600px',
            data: {user: user, edit: false}
        });
    }

    openDeleteUser(user: User) {
        this.dialog.open(UserDeleteComponent, {
            width: '600px',
            data: {user: user}
        });
    }

    openCreateUser() {
        this.dialog.open(UserDialogComponent, {
            width: '600px'
        });
    }

    public handlePage(e: any) {
        this.currentPage = e.pageIndex;
        this.pageSize = e.pageSize;
        this.iterator();
    }

    private iterator() {
        const end = (this.currentPage + 1) * this.pageSize;
        const start = this.currentPage * this.pageSize;
        const part = this.array.slice(start, end);
        this.dataSource = part;
    }

    mobileClass(element: string): string {
        switch (element) {
            case 'paginator':
                if (this.mobileLayout) {
                    return 'paginator-mobile';
                }
                return '';
            default:
                break;
        }
    }
}
