import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailIncidentsComponent } from './incidence-detail.component';

describe('DetailIncidentsComponent', () => {
  let component: DetailIncidentsComponent;
  let fixture: ComponentFixture<DetailIncidentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailIncidentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
