import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavMfcComponent } from './sidenav-neuraflow.component';

describe('SidenavMfcComponent', () => {
  let component: SidenavMfcComponent;
  let fixture: ComponentFixture<SidenavMfcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavMfcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavMfcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
