import { TestBed } from '@angular/core/testing';

import { HistoricalAlarmActiveService } from './historical-alarm-active.service';

describe('HistoricalAlarmActiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HistoricalAlarmActiveService = TestBed.get(HistoricalAlarmActiveService);
    expect(service).toBeTruthy();
  });
});
