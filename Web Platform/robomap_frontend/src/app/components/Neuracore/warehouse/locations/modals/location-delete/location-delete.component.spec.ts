import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDeleteComponent } from './location-delete.component';

describe('LocationDeleteComponent', () => {
  let component: LocationDeleteComponent;
  let fixture: ComponentFixture<LocationDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
