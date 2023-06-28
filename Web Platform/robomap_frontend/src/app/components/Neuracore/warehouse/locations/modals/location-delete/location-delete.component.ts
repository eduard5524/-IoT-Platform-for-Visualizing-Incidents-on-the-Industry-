import { Component, Inject } from '@angular/core';
import { WarehouseLocation } from '../../../../../../models/api/warehouse-location';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { WarehouseLocationService } from '../../../../../../services/Neuracore/warehouse-location.service';

@Component({
  selector: 'app-location-delete',
  templateUrl: './location-delete.component.html',
  styleUrls: ['../../../../../../../assets/styles/tables-global-styles.css']
})
export class LocationDeleteComponent {

  public warehouseLocation: WarehouseLocation;

  constructor(public dialogRef: MatDialogRef<LocationDeleteComponent>,
    private warehouseLocationService: WarehouseLocationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data != null) {
      this.warehouseLocation = data.warehouseLocation;
    }
  }

  onDeleteClick(): void {
    this.warehouseLocationService.delete(this.warehouseLocation.id).subscribe(result => {
      this.dialogRef.close();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
