import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataInitializeComponent } from './data-initialize.component';

describe('DataInitializeComponent', () => {
  let component: DataInitializeComponent;
  let fixture: ComponentFixture<DataInitializeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataInitializeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataInitializeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
