import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionService } from '../../../../services/session.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { BaseModulesComponent } from '../../../base-modules.component';
import { RolesService } from '../../../../services/roles.service';
import { Provider } from '../../../../models/api/provider';
import { ProvidersService } from '../../../../services/Neuracore/providers.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContextMenuComponent } from '../../../General/context-menu/context-menu.component';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { data } from 'jquery';
import { ProviderDialogComponent } from './modals/provider-dialog/provider-dialog.component';
import { ProviderDeleteComponent } from './modals/provider-delete/provider-delete.component';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['../../../../../assets/styles/tables-global-styles.css']
})
export class ProvidersComponent extends BaseModulesComponent implements OnInit {
  public providers: Provider[];
  public dataSource = new MatTableDataSource<Provider>();

  public columnsToDisplay: string[];
  private columnsToDisplayDesktop = ['check', 'edit', 'name', 'vat', 'address', 'country', 'phone', 'email', 'view'];
  private columnsToDisplayMobile = ['check', 'edit', 'name', 'vat', 'address', 'country', 'phone', 'email', 'view'];

  private mobileLayout: boolean;

  public array: any;
  public displayedColumns = ['', '', '', '', ''];

  public pageSize = 25;
  public currentPage = 0;
  public totalSize = 0;
  public pageEvent: any;
  public createManufacturerModal: any;

  @ViewChild(ContextMenuComponent)
  contextMenu: ContextMenuComponent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(public translate: TranslateService,
    public sessionService: SessionService,
    private snackBar: MatSnackBar,
    public rolesService: RolesService,
    public dialog: MatDialog,
    public providersService: ProvidersService,
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
    this.providersService.shouldUpdateObservable().subscribe(() => {
      this.requestData();
    });

  }

  onRightClick(event: MouseEvent, provider: Provider) {
    this.contextMenu.menuData = { 'item': provider };
    this.contextMenu.open(event);
  }

  openEditProvider(provider: Provider) {
    this.dialog.open(ProviderDialogComponent, {
      width: '1500px',
      data: { provider: provider, edit: true }
    });
  }

  openCreateProvider() {
    this.dialog.open(ProviderDialogComponent, {
      width: '1500px'
    });
  }

  openViewProvider(provider: Provider) {
    this.dialog.open(ProviderDialogComponent, {
      width: '1500px',
      data: { provider: provider, edit: false }
    });
  }

  openDeleteProvider(provider: Provider) {
    this.dialog.open(ProviderDeleteComponent, {
      width: '600px',
      data: { provider: provider }
    });
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  requestData() {
    this.providersService.list().subscribe(data => {
      this.providers = data;
      this.array = data;
      this.dataSource = new MatTableDataSource<Provider>(this.providers);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.totalSize = this.providers.length;
      this.iterator();
    });

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
