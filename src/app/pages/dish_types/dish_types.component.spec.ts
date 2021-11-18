import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishTypesComponent } from './dish_types.component';

describe('DishTypesComponent', () => {
  let component: DishTypesComponent;
  let fixture: ComponentFixture<DishTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
