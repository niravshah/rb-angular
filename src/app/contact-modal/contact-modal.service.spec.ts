import { TestBed, inject } from '@angular/core/testing';

import { ContactModalService } from './contact-modal.service';

describe('ContactModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactModalService]
    });
  });

  it('should ...', inject([ContactModalService], (service: ContactModalService) => {
    expect(service).toBeTruthy();
  }));
});
