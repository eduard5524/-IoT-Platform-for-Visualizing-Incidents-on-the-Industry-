import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderDialogComponent } from './provider-dialog.component';

describe('ProviderDialogComponent', () => {
  let component: ProviderDialogComponent;
  let fixture: ComponentFixture<ProviderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
