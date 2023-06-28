import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesDeleteComponent } from './roles-delete.component';

describe('RolesDeleteComponent', () => {
  let component: RolesDeleteComponent;
  let fixture: ComponentFixture<RolesDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
