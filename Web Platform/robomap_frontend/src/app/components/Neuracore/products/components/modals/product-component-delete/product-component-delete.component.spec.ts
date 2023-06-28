import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponentDeleteComponent } from './product-component-delete.component';

describe('ProductComponentDeleteComponent', () => {
  let component: ProductComponentDeleteComponent;
  let fixture: ComponentFixture<ProductComponentDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductComponentDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponentDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
