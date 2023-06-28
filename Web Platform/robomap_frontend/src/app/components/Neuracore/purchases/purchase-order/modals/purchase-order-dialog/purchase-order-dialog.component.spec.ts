import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderDialogComponent } from './purchase-order-dialog.component';

describe('PurchaseOrderDialogComponent', () => {
  let component: PurchaseOrderDialogComponent;
  let fixture: ComponentFixture<PurchaseOrderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
