import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishesAddVideoComponent } from './dishes-add-video.component';

describe('DishesAddVideoComponent', () => {
  let component: DishesAddVideoComponent;
  let fixture: ComponentFixture<DishesAddVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishesAddVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishesAddVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
