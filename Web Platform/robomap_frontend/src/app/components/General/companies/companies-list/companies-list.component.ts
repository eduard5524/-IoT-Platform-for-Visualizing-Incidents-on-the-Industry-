import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Company } from '../../../../models/api/company';
import { CompaniesService } from '../../../../services/General/companies.service';
import { ContextMenuComponent } from '../../../General/context-menu/context-menu.component';
import { CompanyDialogComponent } from '../modals/company-dialog/company-dialog.component';
import { CompanyDeleteComponent } from '../modals/company-delete/company-delete.component';
import { BaseModulesComponent } from '../../../base-modules.component';
import { RolesService } from '../../../../services/roles.service';
import { SessionService } from '../../../../services/session.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
    selector: 'app-companies-list',
    templateUrl: './companies-list.component.html',
    styleUrls: ['../../../../../assets/styles/tables-global-styles.css']
})
export class CompaniesListComponent extends BaseModulesComponent implements OnInit {

    private companies: Company[];
    public dataSource = new MatTableDataSource<Company>();

    public columnsToDisplay: string[];
    private columnsDesktop = ['check', 'edit', 'name', 'nif', 'email', 'phone', 'address', 'view'];
    private columnsMobile = ['check', 'edit', 'name', 'phone', 'view'];

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
        private companiesService: CompaniesService,
        public rolesService: RolesService,
        public sessionService: SessionService,
        private dialog: MatDialog,
        private breakPointObserver: BreakpointObserver) {
        super(rolesService, sessionService);
        breakPointObserver
            .observe(['(max-width: 1023px)'])
            .subscribe((state: BreakpointState) => {
                if (state.matches) {
                    this.columnsToDisplay = this.columnsMobile;
                    this.mobileLayout = true;
                } else {
                    this.columnsToDisplay = this.columnsDesktop;
                    this.mobileLayout = false;
                }
            });
    }

    ngOnInit() {
        super.ngOnInit();
        this.dataSource.paginator = this.paginator;

        this.companiesService.shouldUpdateObservable().subscribe(() => {
            this.requestData();
        });

        this.requestData();
    }

    requestData() {
        this.companiesService.list().subscribe(data => {
            this.companies = data;
            this.array = data;
            this.dataSource = new MatTableDataSource<Company>(this.companies);
        });
    }

    onRightClick(event: MouseEvent, company: Company) {
        this.contextMenu.menuData = { 'item': company };
        this.contextMenu.open(event);
    }

    openView(company: Company) {
        this.dialog.open(CompanyDialogComponent, {
            width: '1500px',
            data: { company: company, edit: false }
        });
    }

    openEdit(company: Company) {
        this.dialog.open(CompanyDialogComponent, {
            width: '1500px',
            data: { company: company, edit: true }
        });
    }

    openDelete(company: Company) {
        this.dialog.open(CompanyDeleteComponent, {
            width: '600px',
            data: { company: company }
        });
    }

    openCreateCompany() {
        this.dialog.open(CompanyDialogComponent, {
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
