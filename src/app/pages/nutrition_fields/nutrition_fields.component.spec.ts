import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionFieldsComponent } from './nutrition_fields.component';

describe('NutritionFieldsComponent', () => {
  let component: NutritionFieldsComponent;
  let fixture: ComponentFixture<NutritionFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutritionFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
