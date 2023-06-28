import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentPurchasedDialogComponent } from './component-purchased-dialog.component';

describe('ComponentPurchasedDialogComponent', () => {
  let component: ComponentPurchasedDialogComponent;
  let fixture: ComponentFixture<ComponentPurchasedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentPurchasedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentPurchasedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
