import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundraiserHeaderComponent } from './fundraiser-header.component';

describe('FundraiserHeaderComponent', () => {
  let component: FundraiserHeaderComponent;
  let fixture: ComponentFixture<FundraiserHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundraiserHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundraiserHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
