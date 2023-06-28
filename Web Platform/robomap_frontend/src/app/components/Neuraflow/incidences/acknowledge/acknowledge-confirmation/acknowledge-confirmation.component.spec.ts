import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationAcknowComponent } from './acknowledge-confirmation.component';

describe('ConfirmationAcknowComponent', () => {
  let component: ConfirmationAcknowComponent;
  let fixture: ComponentFixture<ConfirmationAcknowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationAcknowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationAcknowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
