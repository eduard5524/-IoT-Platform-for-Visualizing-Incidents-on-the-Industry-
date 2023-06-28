import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsWarehouseComponent } from './components-warehouse.component';

describe('ComponentsWarehouseComponent', () => {
  let component: ComponentsWarehouseComponent;
  let fixture: ComponentFixture<ComponentsWarehouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentsWarehouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
