import { TestBed } from '@angular/core/testing';

import { PlcService } from './plc.service';

describe('PlcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlcService = TestBed.get(PlcService);
    expect(service).toBeTruthy();
  });
});
