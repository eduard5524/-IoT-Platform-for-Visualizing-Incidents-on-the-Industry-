import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponentDialogComponent } from './product-component-dialog.component';

describe('ProductComponentDialogComponent', () => {
  let component: ProductComponentDialogComponent;
  let fixture: ComponentFixture<ProductComponentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductComponentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
