import { Component, Inject } from '@angular/core';
import { Product } from '../../../../../../models/api/product';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProductService } from '../../../../../../services/Neuracore/product.service';

@Component({
  selector: 'app-product-component-delete',
  templateUrl: './product-component-delete.component.html',
  styleUrls: ['../../../../../../../assets/styles/tables-global-styles.css']
})
export class ProductComponentDeleteComponent {

  public product: Product;

  constructor(public dialogRef: MatDialogRef<ProductComponentDeleteComponent>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data != null) {
      this.product = data.product;
    }
  }

  onDeleteClick(): void {
    this.productService.delete(this.product.id).subscribe(result => {
      this.dialogRef.close();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
