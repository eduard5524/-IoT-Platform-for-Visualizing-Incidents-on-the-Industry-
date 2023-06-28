import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialManagementComponent } from './neuracore.component';

describe('MaterialManagementComponent', () => {
  let component: MaterialManagementComponent;
  let fixture: ComponentFixture<MaterialManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
