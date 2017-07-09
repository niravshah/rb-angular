import { TestBed, inject } from '@angular/core/testing';

import { PhoneVerifyService } from './phone-verify.service';

describe('PhoneVerifyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhoneVerifyService]
    });
  });

  it('should ...', inject([PhoneVerifyService], (service: PhoneVerifyService) => {
    expect(service).toBeTruthy();
  }));
});
