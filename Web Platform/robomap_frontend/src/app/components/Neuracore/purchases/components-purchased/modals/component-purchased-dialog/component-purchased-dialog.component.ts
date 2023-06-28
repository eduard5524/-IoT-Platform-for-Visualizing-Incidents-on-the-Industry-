import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { SessionService } from '../../../../../../services/session.service';
import { TranslateService } from '@ngx-translate/core';
import { PurchaseDetail } from '../../../../../../models/api/purchase-detail';
import { PurchaseDetailService } from '../../../../../../services/Neuracore/purchase-detail.service';
import { PurchaseOrderService } from '../../../../../../services/Neuracore/purchase-order.service';
import { advanceActivatedRoute } from '@angular/router/src/router_state';
import { BaseModulesComponent } from '../../../../../base-modules.component';
import { RolesService } from '../../../../../../services/roles.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { PurchaseOrder } from 'src/app/models/api/purchase-order';


@Component({
  selector: 'app-component-purchased-dialog',
  templateUrl: './component-purchased-dialog.component.html',
  styleUrls: ['../../../../../../../assets/styles/tables-global-styles.css']
})
export class ComponentPurchasedDialogComponent extends BaseModulesComponent implements OnInit {
  id: any;
  purchaseDetail: PurchaseDetail = {
    id: null,
    component: null,
    ref_component: null,
    order_num: null,
    project_num: null,
    provider: null,
    quantity: null,
    ref_num: null,
    state: null,
    note: null
  }

  public edit: boolean;
  public create: boolean;
  public userRole: string;

  private mobileLayout: boolean;

  purchasedetail_arr: any[] = new Array();
  stateOrder = 0;
  enCamino: any[] = new Array();
  incompleto: any[] = new Array();
  recibido: any[] = new Array();
  purchaseDetails_temp: PurchaseDetail[] = new Array();
  purchaseDetails: PurchaseDetail[] = new Array();
  purchase: PurchaseOrder;

  constructor(
    public translate: TranslateService,
    public dialogRef: MatDialogRef<ComponentPurchasedDialogComponent>,
    public purchaseDetailService: PurchaseDetailService,
    public purchaseOrderService: PurchaseOrderService,
    public sessionService: SessionService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public rolesService: RolesService,
    public dialog: MatDialog,
    private breakPointObserver: BreakpointObserver) {
    super(rolesService, sessionService);

    breakPointObserver
      .observe(['(max-width: 1023px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.mobileLayout = true;
        } else {
          this.mobileLayout = false;

        }
      });

    if (data != null) {
      this.purchaseDetail = data.purchasedetail;
      this.edit = data.edit;
      this.create = false;
    } else {
      this.purchaseDetail = new PurchaseDetail();
      this.edit = true;
      this.create = true;
    }

    this.purchaseDetailService.list().subscribe(data => {
      //console.log(data);
      this.purchaseDetails = data;
      let incompleto = this.translate.instant('MATERIAL_MNG.incomplete');
      let encamino = this.translate.instant('MATERIAL_MNG.in_route');
      let recibido = this.translate.instant('MATERIAL_MNG.received');
    });


  }

  ngOnInit() {

  }

  onClickEdit() {
    this.edit = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
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






  save() {
    console.log(this.purchaseDetail);
    var note = $("#note").val();
    var state = $("#state").val();

    this.purchaseDetail.note = note.toString();
    this.purchaseDetail.state = parseInt(state.toString());

    console.log(this.purchaseDetail);

    this.purchaseDetailService.put(this.purchaseDetail).subscribe(data => {
      console.log(data);
    });
  }

  close() {
    this.dialog.closeAll();
  }

}

