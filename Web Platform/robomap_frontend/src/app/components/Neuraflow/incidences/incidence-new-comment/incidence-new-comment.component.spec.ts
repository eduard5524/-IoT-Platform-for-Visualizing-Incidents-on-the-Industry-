import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIncidentCommentComponent } from './incidence-new-comment.component';

describe('NewIncidentCommentComponent', () => {
  let component: NewIncidentCommentComponent;
  let fixture: ComponentFixture<NewIncidentCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewIncidentCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewIncidentCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
