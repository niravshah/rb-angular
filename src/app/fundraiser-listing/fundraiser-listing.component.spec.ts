import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundraiseListingComponent } from './fundraiser-listing.component';

describe('HomeFundraisersComponent', () => {
  let component: FundraiseListingComponent;
  let fixture: ComponentFixture<FundraiseListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundraiseListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundraiseListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
