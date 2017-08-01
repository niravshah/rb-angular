import { TestBed, inject } from '@angular/core/testing';

import { BlogListingService } from './blog-listing.service';

describe('BlogListingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogListingService]
    });
  });

  it('should ...', inject([BlogListingService], (service: BlogListingService) => {
    expect(service).toBeTruthy();
  }));
});
