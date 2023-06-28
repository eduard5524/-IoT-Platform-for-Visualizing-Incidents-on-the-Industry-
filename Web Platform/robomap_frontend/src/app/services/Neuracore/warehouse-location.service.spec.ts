import { TestBed } from '@angular/core/testing';

import { WarehouseLocationService } from './warehouse-location.service';

describe('WarehouseLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WarehouseLocationService = TestBed.get(WarehouseLocationService);
    expect(service).toBeTruthy();
  });
});
