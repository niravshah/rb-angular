import { TestBed, inject } from '@angular/core/testing';

import { StripeComponentService } from './stripe-component.service';

describe('StripeComponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StripeComponentService]
    });
  });

  it('should ...', inject([StripeComponentService], (service: StripeComponentService) => {
    expect(service).toBeTruthy();
  }));
});
