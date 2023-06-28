import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesSelectComponent } from './companies-select.component';

describe('CompaniesSelectComponent', () => {
  let component: CompaniesSelectComponent;
  let fixture: ComponentFixture<CompaniesSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompaniesSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
