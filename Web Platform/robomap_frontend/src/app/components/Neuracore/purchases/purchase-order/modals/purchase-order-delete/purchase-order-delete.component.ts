import { Component, Inject } from '@angular/core';
import { PurchaseOrder } from '../../../../../../models/api/purchase-order';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PurchaseOrderService } from '../../../../../../services/Neuracore/purchase-order.service';

@Component({
  selector: 'app-purchase-order-delete',
  templateUrl: './purchase-order-delete.component.html',
  styleUrls: ['../../../../../../../assets/styles/tables-global-styles.css']
})
export class PurchaseOrderDeleteComponent {

  public purchaseorder: PurchaseOrder;

  constructor(public dialogRef: MatDialogRef<PurchaseOrderDeleteComponent>,
    private purchaseOrderService: PurchaseOrderService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data != null) {
      this.purchaseorder = data.purchaseorder;
    }
  }

  onDeleteClick(): void {
    this.purchaseOrderService.delete(this.purchaseorder.id).subscribe(result => {
      this.dialogRef.close();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
