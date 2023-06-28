import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionService } from '../../../services/session.service';
import { TranslateService } from '@ngx-translate/core';
import { DetailIncidentsComponent } from './incidence-detail/incidence-detail.component';
import { Alarm } from '../../../models/api/alarm';
import { AlarmsService } from '../../../services/Neuraflow/incidences.service';
import { RolesService } from '../../../services/roles.service';
import { BaseModulesComponent } from '../../base-modules.component';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { ContextMenuComponent } from '../../General/context-menu/context-menu.component';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { interval, Subscription } from 'rxjs';


@Component({
    entryComponents: [DetailIncidentsComponent],
    selector: 'app-incidences',
    templateUrl: './incidences.component.html',
    styleUrls: ['../../../../assets/styles/tables-global-styles.css']
})

export class AlarmsComponent extends BaseModulesComponent implements OnInit {
    subscription: Subscription;

    public alarms: Alarm[];
    public dataSource = new MatTableDataSource<Alarm>();

    public columnsToDisplay: string[];
    private columnsToDisplayDesktop = ['id_alarm', 'description', 'device', 'location', 'state'];
    private columnsToDisplayMobile = ['id_alarm', 'description', 'device', 'location', 'state'];

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
    constructor(public translate: TranslateService, public sessionService: SessionService, public dialog: MatDialog, public alarmsService: AlarmsService,
        public rolesService: RolesService, breakPointObserver: BreakpointObserver) {

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


    ngOnInit(): void {
        super.ngOnInit();
        this.alarmsService.shouldUpdateObservable().subscribe(() => {
            this.requestData();
          });

          const source = interval(2000);
          this.subscription = source.subscribe(val => this.requestData());

    }


  onRightClick(event: MouseEvent, alarm: Alarm) {
    this.contextMenu.menuData = { 'item': alarm };
    this.contextMenu.open(event);
  }

  openViewAlarm(alarm: Alarm) {
    this.dialog.open(DetailIncidentsComponent, {
      width: '1500px',
      data: { alarm: alarm, edit: false }
    });
  }


  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  requestData() {
    this.alarmsService.list().subscribe(data => {
      this.alarms = data;
      this.array = data;
      this.dataSource = new MatTableDataSource<Alarm>(this.alarms);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.totalSize = this.alarms.length;
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

/*
    reloadIncidents(): void {
        this.getAllAlarms(this.dialog);

        var today = new Date();
        var ampm = (today.getUTCHours() >= 12) ? " PM" : " AM";
        var fecha = ("0" + today.getDate()).slice(-2) + "/" + ("0" + (today.getMonth() + 1)).slice(-2) + "/" + today.getFullYear() + " " + ("0" + (today.getUTCHours() + 1)).slice(-2) + ":" + today.getMinutes() + ":" + today.getSeconds() + ampm;
        $("#date-update-incidents").html(fecha);
    }

    getAllAlarms(dialog: MatDialog): void {
        console.log("ALARM");
        this.alarmsService.list().subscribe(data => {
            this.alarms = data;
            this.dataSource = new MatTableDataSource<Alarm>(this.alarms);
            console.log(this.alarms);
        });
    }*/
}


