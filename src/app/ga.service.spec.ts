import { TestBed, inject } from '@angular/core/testing';

import { AnalyticsService } from './ga.service';

describe('GaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnalyticsService]
    });
  });

  it('should ...', inject([AnalyticsService], (service: AnalyticsService) => {
    expect(service).toBeTruthy();
  }));
});
