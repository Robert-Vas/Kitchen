import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodReviewsComponent } from './good-reviews.component';

describe('GoodReviewsComponent', () => {
  let component: GoodReviewsComponent;
  let fixture: ComponentFixture<GoodReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
