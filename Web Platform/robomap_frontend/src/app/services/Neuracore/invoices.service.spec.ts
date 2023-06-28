import { TestBed } from '@angular/core/testing';

import { InvoicesService } from './invoices.service';

describe('InvoicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvoicesService = TestBed.get(InvoicesService);
    expect(service).toBeTruthy();
  });
});
