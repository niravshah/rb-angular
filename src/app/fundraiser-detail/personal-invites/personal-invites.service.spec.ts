import { TestBed, inject } from '@angular/core/testing';

import { PersonalInvitesService } from './personal-invites.service';

describe('PersonalInvitesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonalInvitesService]
    });
  });

  it('should ...', inject([PersonalInvitesService], (service: PersonalInvitesService) => {
    expect(service).toBeTruthy();
  }));
});
