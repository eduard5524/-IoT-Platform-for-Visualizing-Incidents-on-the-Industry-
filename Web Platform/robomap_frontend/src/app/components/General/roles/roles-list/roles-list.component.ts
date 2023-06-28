import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource, PageEvent} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {Role} from '../../../../models/api/role';
import {RolesService} from '../../../../services/roles.service';
import {ContextMenuComponent} from '../../../General/context-menu/context-menu.component';
import {RolesDialogComponent} from '../modals/roles-dialog/roles-dialog.component';
import {BaseModulesComponent} from '../../../base-modules.component';
import {SessionService} from '../../../../services/session.service';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {Company} from '../../../../models/api/company';
import {CompanyDeleteComponent} from '../../companies/modals/company-delete/company-delete.component';
import {RolesDeleteComponent} from '../modals/roles-delete/roles-delete.component';

@Component({
    selector: 'app-roles-list',
    templateUrl: './roles-list.component.html',
    styleUrls: ['../../../../../assets/styles/tables-global-styles.css']
})
export class RolesListComponent extends BaseModulesComponent implements OnInit {

    private roles: Role[];
    public dataSource = new MatTableDataSource<Role>();

    public columnsToDisplay: string[];
    private columnsDesktop =  ['check', 'edit', 'name', 'lock', 'view'];
    private columnsMobile =  ['check', 'edit', 'name', 'lock', 'view'];

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
                public roleService: RolesService,
                public sessionService: SessionService,
                private dialog: MatDialog,
                private breakPointObserver: BreakpointObserver) {
        super(roleService, sessionService);
        breakPointObserver
            .observe(['(max-width: 1023px)'])
            .subscribe((state: BreakpointState) => {
                if (state.matches) {
                    this.mobileLayout = true;
                    this.columnsToDisplay = this.columnsMobile;
                } else {
                    this.mobileLayout = false;
                    this.columnsToDisplay = this.columnsDesktop;
                }
            });
    }

    ngOnInit() {
        super.ngOnInit();
        this.dataSource.paginator = this.paginator;

        this.roleService.shouldUpdateObservable().subscribe(() => {
            this.requestData();
        });

        this.requestData();
    }

    requestData() {
        this.roleService.list().subscribe(data => {
            console.log(data);
            this.roles = data;
            this.array = data;
            this.dataSource = new MatTableDataSource<Role>(this.roles);
        });
    }

    onRightClick(event: MouseEvent, role: Role) {
        this.contextMenu.menuData = {'item': role};
        this.contextMenu.open(event);
    }

    openView(role: Role) {
        this.dialog.open(RolesDialogComponent, {
            width: '1500px',
            data: {role: role, edit: false}
        });
    }

    openEdit(role: Role) {
        this.dialog.open(RolesDialogComponent, {
            width: '1500px',
            data: {role: role, edit: true}
        });
    }

    openDelete(role: Role) {
        this.dialog.open(RolesDeleteComponent, {
            width: '600px',
            data: {role: role}
        });
    }

    openCreateRole() {
        this.dialog.open(RolesDialogComponent, {
            width: '1500px'
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
