import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeRedirectComponent } from './stripe-redirect.component';

describe('StripeRedirectComponent', () => {
  let component: StripeRedirectComponent;
  let fixture: ComponentFixture<StripeRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripeRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
