import { TestBed } from '@angular/core/testing';

import { DetailPurchaseService } from './detail-purchase.service';

describe('DetailPurchaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetailPurchaseService = TestBed.get(DetailPurchaseService);
    expect(service).toBeTruthy();
  });
});
