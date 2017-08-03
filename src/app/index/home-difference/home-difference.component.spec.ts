import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDifferenceComponent } from './home-difference.component';

describe('ParallexAboutComponent', () => {
  let component: HomeDifferenceComponent;
  let fixture: ComponentFixture<HomeDifferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDifferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDifferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
