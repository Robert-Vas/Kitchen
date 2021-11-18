import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergensAddComponent } from './allergens-add.component';

describe('AllergensAddComponent', () => {
  let component: AllergensAddComponent;
  let fixture: ComponentFixture<AllergensAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllergensAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergensAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
