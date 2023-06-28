import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../../models/api/user';
import { UsersService } from '../../../../services/users.service';
import { RolesService } from '../../../../services/roles.service';
import { Role } from '../../../../models/api/role';
import { BaseModulesComponent } from '../../../base-modules.component';
import { Observable } from 'rxjs';
import { SessionService } from '../../../../services/session.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent extends BaseModulesComponent implements OnInit {

  public userRole: string;
  public roles: Role[];
  public user: User = new User();
  public edit: boolean;
  public create: boolean;

  private mobileLayout: boolean;

  constructor(
    private translate: TranslateService,
    private userService: UsersService,
    public rolesService: RolesService,
    public sessionService: SessionService,
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
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.requestData();
  }

  requestData() {
    this.userService.getUserData(this.sessionService.getUserId()).subscribe(data => {
      this.user = data;
      this.user.role_id = this.sessionService.getUserRolId();
      this.user.role_name = this.sessionService.getUserRol();
      console.log(this.user);

    });

    this.rolesService.list().subscribe(data => {
      this.roles = data;
    });
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
