import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesRibbonComponent } from './cookies-ribbon.component';

describe('CookiesRibbonComponent', () => {
  let component: CookiesRibbonComponent;
  let fixture: ComponentFixture<CookiesRibbonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookiesRibbonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookiesRibbonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
