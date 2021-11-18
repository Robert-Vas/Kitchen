import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishesPreviewComponent } from './dishes-preview.component';

describe('DishesPreviewComponent', () => {
  let component: DishesPreviewComponent;
  let fixture: ComponentFixture<DishesPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishesPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishesPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
