import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../../services/roles.service';
import { SessionService } from '../../../services/session.service';
import { BaseModulesComponent } from '../../base-modules.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseModulesComponent implements OnInit {

  constructor(
    public sessionService: SessionService,
    public rolesService: RolesService,
  ) {
    super(rolesService, sessionService);
  }

  ngOnInit() {  }

}
