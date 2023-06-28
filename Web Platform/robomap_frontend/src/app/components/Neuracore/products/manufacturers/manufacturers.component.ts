import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionService } from '../../../../services/session.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { BaseModulesComponent } from '../../../base-modules.component';
import { RolesService } from '../../../../services/roles.service';
import { Manufacturer } from '../../../../models/api/manufacturer';
import { ManufacturersService } from '../../../../services/Neuracore/manufacturers.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContextMenuComponent } from '../../../General/context-menu/context-menu.component';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { data } from 'jquery';
import { ManufacturerDialogComponent } from './modals/manufacturer-dialog/manufacturer-dialog.component';
import { ManufacturerDeleteComponent } from './modals/manufacturer-delete/manufacturer-delete.component';

@Component({
  selector: 'app-manufacturers',
  templateUrl: './manufacturers.component.html',
  styleUrls: ['../../../../../assets/styles/tables-global-styles.css']
})
export class ManufacturersComponent extends BaseModulesComponent implements OnInit {
  public manufacturers: Manufacturer[];
  public dataSource = new MatTableDataSource<Manufacturer>();

  public columnsToDisplay: string[];
  private columnsToDisplayDesktop = ['check', 'edit', 'name', 'vat', 'address', 'country', 'phone', 'email', 'view'];
  private columnsToDisplayMobile = ['check', 'edit', 'name', 'vat', 'email', 'view'];

  private mobileLayout: boolean;

  public array: any;
  public displayedColumns = ['', '', '', '', ''];

  public pageSize = 25;
  public currentPage = 0;
  public totalSize = 0;
  public pageEvent: any;
  public onNoClick: any;
  public edit: any;
  public create: any;

  @ViewChild(ContextMenuComponent)
  contextMenu: ContextMenuComponent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(public translate: TranslateService,
    public sessionService: SessionService,
    private snackBar: MatSnackBar,
    public rolesService: RolesService,
    public dialog: MatDialog,
    public manufacturerService: ManufacturersService,
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
    this.manufacturerService.shouldUpdateObservable().subscribe(() => {
      this.requestData();
    });

  }

  onRightClick(event: MouseEvent, manufacturer: Manufacturer) {
    this.contextMenu.menuData = { 'item': manufacturer };
    this.contextMenu.open(event);
  }

  openEditManufacturer(manufacturer: Manufacturer) {
    this.dialog.open(ManufacturerDialogComponent, {
      width: '1500px',
      data: { manufacturer: manufacturer, edit: true }
    });
  }

  openCreateManufacturer() {
    this.dialog.open(ManufacturerDialogComponent, {
      width: '1500px'
    });
  }

  openViewManufacturer(manufacturer: Manufacturer) {
    this.dialog.open(ManufacturerDialogComponent, {
      width: '1500px',
      data: { manufacturer: manufacturer, edit: false }
    });
  }

  openDeleteManufacturer(manufacturer: Manufacturer) {
    this.dialog.open(ManufacturerDeleteComponent, {
      width: '600px',
      data: { manufacturer: manufacturer }
    });
  }


  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  requestData() {
    this.manufacturerService.list().subscribe(data => {
      this.manufacturers = data;
      this.array = data;
      this.dataSource = new MatTableDataSource<Manufacturer>(this.manufacturers);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.totalSize = this.manufacturers.length;
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
