import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionService } from '../../../../services/session.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatPaginator, MatTableDataSource, MatSort, PageEvent, MatTableModule  } from '@angular/material';
import { BaseModulesComponent } from '../../../base-modules.component';
import { RolesService } from '../../../../services/roles.service';
import { Product } from '../../../../models/api/product';
import { ProductService } from '../../../../services/Neuracore/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContextMenuComponent } from '../../../General/context-menu/context-menu.component';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { data } from 'jquery';
import { ProductComponentDialogComponent } from './modals/product-component-dialog/product-component-dialog.component';
import { ProductComponentDeleteComponent } from './modals/product-component-delete/product-component-delete.component';
import { ProductComponentCreateComponent } from './modals/product-component-create/product-component-create.component';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['../../../../../assets/styles/tables-global-styles.css']

})
export class ComponentsComponent extends BaseModulesComponent implements OnInit  {
  public products: Product[];
  public dataSource: any;

  public columnsToDisplay: string[];
  private columnsToDisplayDesktop = ['check', 'edit', 'codigo_articulo', 'title', 'tech_sheet', 'imageLink', 'view'];
  private columnsToDisplayMobile = ['check', 'edit', 'codigo_articulo', 'title', 'tech_sheet', 'imageLink', 'view'];

  private mobileLayout: boolean;

  public array: any;
  public displayedColumns = ['', '', '', '', ''];

  public pageSize = 25;
  public currentPage = 0;
  public totalSize = 0;
  public pageEvent: any;
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  @ViewChild(ContextMenuComponent)
  contextMenu: ContextMenuComponent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(public translate: TranslateService,
    public sessionService: SessionService,
    private snackBar: MatSnackBar,
    public rolesService: RolesService,
    public dialog: MatDialog,
    public productsService: ProductService,
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
    this.dataSource = new MatTableDataSource<Product>();
    this.productsService.shouldUpdateObservable().subscribe(() => {
      this.requestData();
    });
  }

  onRightClick(event: MouseEvent, product: Product) {
    this.contextMenu.menuData = { 'item': product };
    this.contextMenu.open(event);
  }

  openEditProductComponent(product: Product) {
    this.dialog.open(ProductComponentDialogComponent, {
      width: '1500px',
      data: { product: product, edit: true }
    });
  }

  openCreateProductComponent() {
    this.dialog.open(ProductComponentCreateComponent, {
      width: '1500px'
    });
  }

  openViewProductComponent(product: Product) {
    this.dialog.open(ProductComponentDialogComponent, {
      width: '1500px',
      data: { product: product, edit: false }
    });
  }

  openDeleteProductComponent(product: Product) {
    this.dialog.open(ProductComponentDeleteComponent, {
      width: '600px',
      data: { product: product }
    });
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  requestData() {
    this.productsService.list().subscribe(data => {
      this.products = data;
      this.array = data;
      this.dataSource = new MatTableDataSource<Product>(this.products);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.totalSize = this.products.length;
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
