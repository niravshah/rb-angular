import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeComponentComponent } from './stripe-component.component';

describe('StripeComponentComponent', () => {
  let component: StripeComponentComponent;
  let fixture: ComponentFixture<StripeComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripeComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
