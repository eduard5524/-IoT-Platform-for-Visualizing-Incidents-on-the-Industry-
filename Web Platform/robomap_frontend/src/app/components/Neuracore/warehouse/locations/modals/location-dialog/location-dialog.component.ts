import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { WarehouseLocation } from '../../../../../../models/api/warehouse-location';
import { WarehouseLocationService } from '../../../../../../services/Neuracore/warehouse-location.service';
import { RolesService } from '../../../../../../services/roles.service';
import { Role } from '../../../../../../models/api/role';
import { BaseModulesComponent } from '../../../../../base-modules.component';
import { Observable } from 'rxjs';
import { SessionService } from '../../../../../../services/session.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-location-dialog',
  templateUrl: './location-dialog.component.html',
  styleUrls: ['../../../../../../../assets/styles/tables-global-styles.css']
})
export class LocationDialogComponent extends BaseModulesComponent implements OnInit {

  public userRole: string;
  public roles: Role[];
  public warehouseLocation: WarehouseLocation;
  public edit: boolean;
  public create: boolean;

  private mobileLayout: boolean;

  constructor(public dialogRef: MatDialogRef<LocationDialogComponent>,
    private translate: TranslateService,
    private warehouseLocationService: WarehouseLocationService,
    public rolesService: RolesService,
    public sessionService: SessionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
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
      this.warehouseLocation = data.warehouseLocation;
      this.edit = data.edit;
      this.create = false;
    } else {
      this.warehouseLocation = new WarehouseLocation();
      this.edit = true;
      this.create = true;
    }
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.requestData();
  }

  requestData() {
    this.rolesService.list().subscribe(data => {
      this.roles = data;
    });
  }

  onCreateClick(): void {
    console.log(this.warehouseLocation);
    if (this.create) {
      this.warehouseLocationService.post(this.warehouseLocation).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.warehouseLocationService.put(this.warehouseLocation).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

  onClickEdit() {
    this.edit = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  mobileClass(element: string): string {
    switch (element) {
      case 'field':
        if (this.mobileLayout) {
          return 'full';
        }
        return 'medium';
      case 'button':
        if (this.mobileLayout) {
          return 'button-mobile';
        }
        return '';
      default:
        break;
    }
  }
}
