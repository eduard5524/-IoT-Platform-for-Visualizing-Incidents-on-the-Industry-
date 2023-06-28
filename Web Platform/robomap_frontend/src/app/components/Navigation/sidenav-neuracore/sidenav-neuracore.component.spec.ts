import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavMaterialManagementComponent } from './sidenav-neuracore.component';

describe('SidenavMaterialManagementComponent', () => {
  let component: SidenavMaterialManagementComponent;
  let fixture: ComponentFixture<SidenavMaterialManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavMaterialManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavMaterialManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
