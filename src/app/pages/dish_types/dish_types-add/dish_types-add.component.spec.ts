import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishTypesAddComponent } from './dish_types-add.component';

describe('DishTypesAddComponent', () => {
  let component: DishTypesAddComponent;
  let fixture: ComponentFixture<DishTypesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishTypesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishTypesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
