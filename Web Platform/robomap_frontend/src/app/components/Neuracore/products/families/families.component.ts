import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionService } from '../../../../services/session.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { BaseModulesComponent } from '../../../base-modules.component';
import { RolesService } from '../../../../services/roles.service';
import { Family } from '../../../../models/api/family';
import { FamiliesService } from '../../../../services/families.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContextMenuComponent } from '../../../General/context-menu/context-menu.component';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { data } from 'jquery';

@Component({
  selector: 'app-families',
  templateUrl: './families.component.html',
  styleUrls: ['../../../../../assets/styles/tables-global-styles.css']
})
export class FamiliesComponent extends BaseModulesComponent implements OnInit {
  public families: Family[];
  public dataSource = new MatTableDataSource<Family>();

  public columnsToDisplay: string[];
  private columnsToDisplayDesktop = ['name', 'files'];
  private columnsToDisplayMobile = ['name', 'files'];

  private mobileLayout: boolean;

  public array: any;
  public displayedColumns = ['', '', '', '', ''];

  public pageSize = 10;
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
    public familiesService: FamiliesService,
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
    this.dataSource.sort = this.sort;
    this.familiesService.shouldUpdateObservable().subscribe(() => {
      this.requestData();
    });

    this.requestData();

  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  requestData() {
    this.familiesService.list().subscribe(data => {
      this.families = data;
      this.array = data;
      this.dataSource = new MatTableDataSource<Family>(this.families);
      this.dataSource.paginator = this.paginator;
      this.totalSize = this.families.length;
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
