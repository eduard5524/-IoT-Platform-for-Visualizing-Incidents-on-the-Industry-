import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderDeleteComponent } from './purchase-order-delete.component';

describe('PurchaseOrderDeleteComponent', () => {
  let component: PurchaseOrderDeleteComponent;
  let fixture: ComponentFixture<PurchaseOrderDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
