import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionService } from '../../../../services/session.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { BaseModulesComponent } from '../../../base-modules.component';
import { RolesService } from '../../../../services/roles.service';
import { WarehouseLocation } from '../../../../models/api/warehouse-location';
import { WarehouseLocationService } from '../../../../services/Neuracore/warehouse-location.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContextMenuComponent } from '../../../General/context-menu/context-menu.component';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { data } from 'jquery';
import { LocationDialogComponent } from './modals/location-dialog/location-dialog.component';
import { LocationDeleteComponent } from './modals/location-delete/location-delete.component';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['../../../../../assets/styles/tables-global-styles.css']
})
export class LocationsComponent extends BaseModulesComponent implements OnInit {
  public warehouseLocations: WarehouseLocation[];
  public dataSource = new MatTableDataSource<WarehouseLocation>();

  public columnsToDisplay: string[];
  private columnsToDisplayDesktop = ['name', 'city', 'address', 'contact_phone', 'contact_email'];
  private columnsToDisplayMobile = ['name', 'city', 'address', 'contact_phone', 'contact_email'];

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
    public warehouseLocationService: WarehouseLocationService,
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
    this.warehouseLocationService.shouldUpdateObservable().subscribe(() => {
      this.requestData();
    });

  }

  onRightClick(event: MouseEvent, warehouseLocation: WarehouseLocation) {
    this.contextMenu.menuData = { 'item': warehouseLocation };
    this.contextMenu.open(event);
  }

  openEditLocation(warehouseLocation: WarehouseLocation) {
    this.dialog.open(LocationDialogComponent, {
      width: '1500px',
      data: { warehouseLocation: warehouseLocation, edit: true }
    });
  }

  openCreateLocation() {
    this.dialog.open(LocationDialogComponent, {
      width: '1500px'
    });
  }

  openViewLocation(warehouseLocation: WarehouseLocation) {
    this.dialog.open(LocationDialogComponent, {
      width: '1500px',
      data: { warehouseLocation: warehouseLocation, edit: false }
    });
  }

  openDeleteLocation(warehouseLocation: WarehouseLocation) {
    this.dialog.open(LocationDeleteComponent, {
      width: '600px',
      data: { warehouseLocation: warehouseLocation }
    });
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  requestData() {
    this.warehouseLocationService.list().subscribe(data => {
      this.warehouseLocations = data;
      this.array = data;
      this.dataSource = new MatTableDataSource<WarehouseLocation>(this.warehouseLocations);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.totalSize = this.warehouseLocations.length;
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
