import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcknowComponent } from './acknowledge.component';

describe('AcknowComponent', () => {
  let component: AcknowComponent;
  let fixture: ComponentFixture<AcknowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcknowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcknowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
