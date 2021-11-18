import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishesPhotoComponent } from './dishes-photo.component';

describe('DishesPhotoComponent', () => {
  let component: DishesPhotoComponent;
  let fixture: ComponentFixture<DishesPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishesPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishesPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
