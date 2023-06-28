import { TestBed } from '@angular/core/testing';

import { PurchaseDetailService } from './purchase-detail.service';

describe('PurchaseDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PurchaseDetailService = TestBed.get(PurchaseDetailService);
    expect(service).toBeTruthy();
  });
});
