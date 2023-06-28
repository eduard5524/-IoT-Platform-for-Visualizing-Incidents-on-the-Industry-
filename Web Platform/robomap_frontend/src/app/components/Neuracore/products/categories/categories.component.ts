import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionService } from '../../../../services/session.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { BaseModulesComponent } from '../../../base-modules.component';
import { RolesService } from '../../../../services/roles.service';
import { Category } from '../../../../models/api/category';
import { CategoriesService } from '../../../../services/Neuracore/categories.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContextMenuComponent } from '../../../General/context-menu/context-menu.component';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { data } from 'jquery';
import { CategoryDialogComponent } from './modals/category-dialog/category-dialog.component';
import { CategoryDeleteComponent } from './modals/category-delete/category-delete.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['../../../../../assets/styles/tables-global-styles.css']
})
export class CategoriesComponent extends BaseModulesComponent implements OnInit {
  public categories: Category[];
  public dataSource = new MatTableDataSource<Category>();

  public columnsToDisplay: string[];
  private columnsToDisplayDesktop = ['check', 'edit', 'name', 'description', 'image', 'view'];
  private columnsToDisplayMobile = ['check', 'edit', 'name', 'description', 'image', 'view'];

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
    public categoriesService: CategoriesService,
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
    this.categoriesService.shouldUpdateObservable().subscribe(() => {
      this.requestData();
    });

  }

  onRightClick(event: MouseEvent, category: Category) {
    this.contextMenu.menuData = { 'item': category };
    this.contextMenu.open(event);
  }

  openEditCategory(category: Category) {
    this.dialog.open(CategoryDialogComponent, {
      width: '1500px',
      data: { category: category, edit: true }
    });
  }

  openCreateCategory() {
    this.dialog.open(CategoryDialogComponent, {
      width: '1500px'
    });
  }

  openViewCategory(category: Category) {
    this.dialog.open(CategoryDialogComponent, {
      width: '1500px',
      data: { category: category, edit: false }
    });
  }

  openDeleteCategory(category: Category) {
    this.dialog.open(CategoryDeleteComponent, {
      width: '600px',
      data: { category: category }
    });
  }


  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  requestData() {
    this.categoriesService.list().subscribe(data => {
      this.categories = data;
      this.array = data;
      this.dataSource = new MatTableDataSource<Category>(this.categories);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.totalSize = this.categories.length;
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
