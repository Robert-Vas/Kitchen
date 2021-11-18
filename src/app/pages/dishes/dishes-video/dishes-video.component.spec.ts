import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishesVideoComponent } from './dishes-video.component';

describe('DishesVideoComponent', () => {
  let component: DishesVideoComponent;
  let fixture: ComponentFixture<DishesVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishesVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishesVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
