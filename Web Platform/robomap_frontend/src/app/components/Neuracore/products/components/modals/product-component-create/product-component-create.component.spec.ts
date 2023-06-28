import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponentCreateComponent } from './product-component-create.component';

describe('ProductComponentCreateComponent', () => {
  let component: ProductComponentCreateComponent;
  let fixture: ComponentFixture<ProductComponentCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductComponentCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
