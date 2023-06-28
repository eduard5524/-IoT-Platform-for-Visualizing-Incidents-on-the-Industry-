import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsPurchasedComponent } from './components-purchased.component';

describe('ComponentsPurchasedComponent', () => {
  let component: ComponentsPurchasedComponent;
  let fixture: ComponentFixture<ComponentsPurchasedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentsPurchasedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsPurchasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
