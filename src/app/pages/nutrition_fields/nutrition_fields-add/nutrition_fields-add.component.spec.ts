import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionFieldsAddComponent } from './nutrition_fields-add.component';

describe('NutritionFieldsAddComponent', () => {
  let component: NutritionFieldsAddComponent;
  let fixture: ComponentFixture<NutritionFieldsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutritionFieldsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionFieldsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
