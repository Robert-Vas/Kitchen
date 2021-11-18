import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwsComponent } from './ows.component';

describe('OwsComponent', () => {
  let component: OwsComponent;
  let fixture: ComponentFixture<OwsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
