import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionService } from '../../../../services/session.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { BaseModulesComponent } from '../../../base-modules.component';
import { RolesService } from '../../../../services/roles.service';
import { PurchaseDetail } from '../../../../models/api/purchase-detail';
import { PurchaseDetailService } from '../../../../services/Neuracore/purchase-detail.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContextMenuComponent } from '../../../General/context-menu/context-menu.component';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { data } from 'jquery';
import { ComponentPurchasedDialogComponent } from './modals/component-purchased-dialog/component-purchased-dialog.component';

@Component({
  selector: 'app-components-purchased',
  templateUrl: './components-purchased.component.html',
  styleUrls: ['../../../../../assets/styles/tables-global-styles.css']
})

export class ComponentsPurchasedComponent extends BaseModulesComponent implements OnInit {
  public purchaseDetails: PurchaseDetail[];
  public dataSource = new MatTableDataSource<PurchaseDetail>();

  public columnsToDisplay: string[];
  private columnsToDisplayDesktop = ['check', 'edit', 'component', 'ref_component', 'order_num', 'project_num', 'provider', 'quantity', 'state', 'view'];
  private columnsToDisplayMobile = ['check', 'edit', 'component', 'ref_component', 'order_num', 'project_num', 'provider', 'quantity', 'state', 'view'];

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
    public purchaseDetailService: PurchaseDetailService,
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
    this.purchaseDetailService.shouldUpdateObservable().subscribe(() => {
      this.requestData();
    });

  }


  onRightClick(event: MouseEvent, purchasedetail: PurchaseDetail) {
    this.contextMenu.menuData = { 'item': purchasedetail };
    this.contextMenu.open(event);
  }

  openEditComponentPurchased(purchasedetail: PurchaseDetail) {
    this.dialog.open(ComponentPurchasedDialogComponent, {
      width: '1500px',
      data: { purchasedetail: purchasedetail, edit: true }
    });
  }

  openViewComponentPurchased(purchasedetail: PurchaseDetail) {
    this.dialog.open(ComponentPurchasedDialogComponent, {
      width: '1500px',
      data: { purchasedetail: purchasedetail, edit: false }
    });
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  requestData() {
    this.purchaseDetailService.list().subscribe(data => {
      this.purchaseDetails = data;
      this.array = data;
      this.dataSource = new MatTableDataSource<PurchaseDetail>(this.purchaseDetails);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.totalSize = this.purchaseDetails.length;
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
