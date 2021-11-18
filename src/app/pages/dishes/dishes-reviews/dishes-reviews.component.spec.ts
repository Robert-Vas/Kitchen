import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishesReviewsComponent } from './dishes-reviews.component';

describe('DishesReviewsComponent', () => {
  let component: DishesReviewsComponent;
  let fixture: ComponentFixture<DishesReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishesReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishesReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
