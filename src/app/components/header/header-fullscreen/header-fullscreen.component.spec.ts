import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderFullscreenComponent } from './header-fullscreen.component';

describe('HeaderFullscreenComponent', () => {
  let component: HeaderFullscreenComponent;
  let fixture: ComponentFixture<HeaderFullscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderFullscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderFullscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
