import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionService } from '../../../services/session.service';
import { TranslateService } from '@ngx-translate/core';
import { Device } from '../../../models/api/device';
import { DevicesService } from '../../../services/Neuraflow/devices.service';
import { RolesService } from '../../../services/roles.service';
import { BaseModulesComponent } from '../../base-modules.component';
import { EditDeviceComponent } from './edit-device/edit-device.component';
import { CreateDeviceComponent } from './create-device/create-device.component';
import { interval, Subscription } from 'rxjs';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ContextMenuComponent } from '../../General/context-menu/context-menu.component';

@Component({
  selector: 'app-settings-devices',
  templateUrl: './settings-devices.component.html',
  styleUrls: ['../../../../assets/styles/tables-global-styles.css']
})
export class SettingsDevicesComponent extends BaseModulesComponent implements OnInit {
    subscription: Subscription;

    private devices: Device[];
    public dataSource = new MatTableDataSource<Device>();

    location: any;



  public columnsToDisplay: string[];
  private columnsToDisplayDesktop = ['id', 'name', 'ip', 'port', 'protocol', 'state', 'actions'];
  private columnsToDisplayMobile = ['id', 'name', 'ip', 'port', 'protocol', 'state', 'actions'];

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
    public dialog: MatDialog,
    public devicesService: DevicesService,
    public rolesService: RolesService,
    breakPointObserver: BreakpointObserver
    ) {

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
    this.devicesService.shouldUpdateObservable().subscribe(() => {
        this.requestData();
      });

      const source = interval(2000);
      this.subscription = source.subscribe(val => this.requestData());
  }

  onRightClick(event: MouseEvent, device: Device) {
    this.contextMenu.menuData = { 'item': device };
    this.contextMenu.open(event);
  }


  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  requestData() {
    this.devicesService.list().subscribe(data => {
      this.devices = data;
      this.array = data;
      this.dataSource = new MatTableDataSource<Device>(this.devices);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.totalSize = this.devices.length;
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

  createDeviceModal() {
    const dialogRef = this.dialog.open(CreateDeviceComponent, {
      width: '1200px',
      data: {
      }
    });

    dialogRef.afterClosed().subscribe(

      data => console.log("Create device output:", data)
    );
  }
}
