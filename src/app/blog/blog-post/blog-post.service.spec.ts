import { TestBed, inject } from '@angular/core/testing';

import { BlogPostService } from './blog-post.service';

describe('BlogPostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogPostService]
    });
  });

  it('should ...', inject([BlogPostService], (service: BlogPostService) => {
    expect(service).toBeTruthy();
  }));
});
