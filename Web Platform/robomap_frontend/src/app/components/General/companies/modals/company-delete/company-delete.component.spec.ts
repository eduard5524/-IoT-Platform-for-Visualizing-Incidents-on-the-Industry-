import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDeleteComponent } from './company-delete.component';

describe('CompanyDeleteComponent', () => {
  let component: CompanyDeleteComponent;
  let fixture: ComponentFixture<CompanyDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
