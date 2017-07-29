import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInvitesComponent } from './personal-invites.component';

describe('PersonalInvitesComponent', () => {
  let component: PersonalInvitesComponent;
  let fixture: ComponentFixture<PersonalInvitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalInvitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
