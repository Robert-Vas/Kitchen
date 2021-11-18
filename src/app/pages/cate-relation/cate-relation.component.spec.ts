import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CateRelationComponent } from './cate-relation.component';

describe('CateRelationComponent', () => {
  let component: CateRelationComponent;
  let fixture: ComponentFixture<CateRelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CateRelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CateRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
