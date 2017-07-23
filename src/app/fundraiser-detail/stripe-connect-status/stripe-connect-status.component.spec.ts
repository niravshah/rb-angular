import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeConnectStatusComponent } from './stripe-connect-status.component';

describe('StripeConnectStatusComponent', () => {
  let component: StripeConnectStatusComponent;
  let fixture: ComponentFixture<StripeConnectStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripeConnectStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeConnectStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
