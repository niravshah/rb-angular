import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComparisionComponent } from './index-comparision.component';

describe('IndexComparisionComponent', () => {
  let component: IndexComparisionComponent;
  let fixture: ComponentFixture<IndexComparisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexComparisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComparisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
