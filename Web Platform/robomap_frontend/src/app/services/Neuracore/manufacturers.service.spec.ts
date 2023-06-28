import { TestBed } from '@angular/core/testing';

import { ManufacturersService } from './manufacturers.service';

describe('ManufacturersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManufacturersService = TestBed.get(ManufacturersService);
    expect(service).toBeTruthy();
  });
});
