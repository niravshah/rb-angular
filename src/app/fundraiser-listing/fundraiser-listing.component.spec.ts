import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFundraisersComponent } from './fundraiser-listing.component';

describe('HomeFundraisersComponent', () => {
  let component: HomeFundraisersComponent;
  let fixture: ComponentFixture<HomeFundraisersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeFundraisersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFundraisersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
