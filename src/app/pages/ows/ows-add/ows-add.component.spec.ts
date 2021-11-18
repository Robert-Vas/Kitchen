import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwsAddComponent } from './ows-add.component';

describe('OwsAddComponent', () => {
  let component: OwsAddComponent;
  let fixture: ComponentFixture<OwsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
