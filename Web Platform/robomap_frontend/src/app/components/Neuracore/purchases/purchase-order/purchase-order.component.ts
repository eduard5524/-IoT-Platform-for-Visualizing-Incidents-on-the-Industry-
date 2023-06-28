import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionService } from '../../../../services/session.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { BaseModulesComponent } from '../../../base-modules.component';
import { RolesService } from '../../../../services/roles.service';
import { PurchaseOrder } from '../../../../models/api/purchase-order';
import { PurchaseOrderService } from '../../../../services/Neuracore/purchase-order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContextMenuComponent } from '../../../General/context-menu/context-menu.component';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { data } from 'jquery';
import { PurchaseOrderDialogComponent } from './modals/purchase-order-dialog/purchase-order-dialog.component';
import { PurchaseOrderDeleteComponent } from './modals/purchase-order-delete/purchase-order-delete.component';
import { PurchaseOrderCreateComponent } from './modals/purchase-order-create/purchase-order-create.component';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['../../../../../assets/styles/tables-global-styles.css']
})

export class PurchaseOrderComponent extends BaseModulesComponent implements OnInit {
  public purchaseOrders: PurchaseOrder[];
  public dataSource = new MatTableDataSource<PurchaseOrder>();

  public columnsToDisplay: string[];
  private columnsToDisplayDesktop = ['check', 'edit', 'project_num', 'order_num','total_price', 'state',  'created_at', 'view'];
  private columnsToDisplayMobile = ['check', 'edit', 'project_num', 'order_num','total_price', 'state',  'created_at', 'view'];

  private mobileLayout: boolean;

  public array: any;
  public displayedColumns = ['', '', '', '', ''];

  public pageSize = 25;
  public currentPage = 0;
  public totalSize = 0;
  public pageEvent: any;

  @ViewChild(ContextMenuComponent)
  contextMenu: ContextMenuComponent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(public translate: TranslateService,
    public sessionService: SessionService,
    private snackBar: MatSnackBar,
    public rolesService: RolesService,
    public dialog: MatDialog,
    public purchaseOrderService: PurchaseOrderService,
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
    this.purchaseOrderService.shouldUpdateObservable().subscribe(() => {
      this.requestData();
    });

  }


  onRightClick(event: MouseEvent, purchaseorder: PurchaseOrder) {
    this.contextMenu.menuData = { 'item': purchaseorder };
    this.contextMenu.open(event);
  }

  openEditPurchaseOrder(purchaseorder: PurchaseOrder) {
    this.dialog.open(PurchaseOrderDialogComponent, {
      width: '1500px',
      data: { purchaseorder: purchaseorder, edit: true }
    });
  }

  openCreatePurchaseOrder() {
    this.dialog.open(PurchaseOrderCreateComponent, {
      width: '1500px'
    });
  }

  openViewPurchaseOrder(purchaseorder: PurchaseOrder) {
    this.dialog.open(PurchaseOrderDialogComponent, {
      width: '1500px',
      data: { purchaseorder: purchaseorder, edit: false }
    });
  }

  openDeletePurchaseOrder(purchaseorder: PurchaseOrder) {
    this.dialog.open(PurchaseOrderDeleteComponent, {
      width: '600px',
      data: { purchaseorder: purchaseorder }
    });
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  requestData() {
    this.purchaseOrderService.list().subscribe(data => {
      this.purchaseOrders = data;
      this.array = data;
      this.dataSource = new MatTableDataSource<PurchaseOrder>(this.purchaseOrders);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.totalSize = this.purchaseOrders.length;
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
