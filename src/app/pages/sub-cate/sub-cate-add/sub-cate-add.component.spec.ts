import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCateAddComponent } from './sub-cate-add.component';

describe('SubCateAddComponent', () => {
  let component: SubCateAddComponent;
  let fixture: ComponentFixture<SubCateAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubCateAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCateAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
