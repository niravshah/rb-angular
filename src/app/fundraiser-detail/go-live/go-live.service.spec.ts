import { TestBed, inject } from '@angular/core/testing';

import { GoLiveService } from './go-live.service';

describe('GoLiveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoLiveService]
    });
  });

  it('should ...', inject([GoLiveService], (service: GoLiveService) => {
    expect(service).toBeTruthy();
  }));
});
