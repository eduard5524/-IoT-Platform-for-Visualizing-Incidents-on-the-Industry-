import { Component, Inject } from '@angular/core';
import { Manufacturer } from '../../../../../../models/api/manufacturer';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ManufacturersService } from '../../../../../../services/Neuracore/manufacturers.service';

@Component({
  selector: 'app-manufacturer-delete',
  templateUrl: './manufacturer-delete.component.html',
  styleUrls: ['../../../../../../../assets/styles/tables-global-styles.css']
})
export class ManufacturerDeleteComponent {

  public manufacturer: Manufacturer;

  constructor(public dialogRef: MatDialogRef<ManufacturerDeleteComponent>,
    private manufacturersService: ManufacturersService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data != null) {
      this.manufacturer = data.manufacturer;
    }
  }

  onDeleteClick(): void {
    this.manufacturersService.delete(this.manufacturer.id).subscribe(result => {
      this.dialogRef.close();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
