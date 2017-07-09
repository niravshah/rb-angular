import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeCreateAccountComponent } from './stripe-create-account.component';

describe('StripeCreateAccountComponent', () => {
  let component: StripeCreateAccountComponent;
  let fixture: ComponentFixture<StripeCreateAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripeCreateAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeCreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
