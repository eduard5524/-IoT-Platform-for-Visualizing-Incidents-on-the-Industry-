import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Provider } from '../../../../../../models/api/provider';
import { ProvidersService } from '../../../../../../services/Neuracore/providers.service';
import { RolesService } from '../../../../../../services/roles.service';
import { Role } from '../../../../../../models/api/role';
import { BaseModulesComponent } from '../../../../../base-modules.component';
import { Observable } from 'rxjs';
import { SessionService } from '../../../../../../services/session.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-provider-dialog',
  templateUrl: './provider-dialog.component.html',
  styleUrls: ['../../../../../../../assets/styles/tables-global-styles.css']
})
export class ProviderDialogComponent extends BaseModulesComponent implements OnInit {

  public userRole: string;
  public roles: Role[];
  public provider: Provider;
  public edit: boolean;
  public create: boolean;

  private mobileLayout: boolean;

  constructor(public dialogRef: MatDialogRef<ProviderDialogComponent>,
    private translate: TranslateService,
    private providersService: ProvidersService,
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
      this.provider = data.provider;
      this.edit = data.edit;
      this.create = false;
    } else {
      this.provider = new Provider();
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
    console.log(this.provider);
    if (this.create) {
      this.providersService.post(this.provider).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.providersService.put(this.provider).subscribe(() => {
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

