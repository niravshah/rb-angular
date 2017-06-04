import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParallexAboutComponent } from './home-difference.component';

describe('ParallexAboutComponent', () => {
  let component: ParallexAboutComponent;
  let fixture: ComponentFixture<ParallexAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParallexAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParallexAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
