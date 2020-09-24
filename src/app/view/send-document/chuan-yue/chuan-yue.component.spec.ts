import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChuanYueComponent } from './chuan-yue.component';

describe('ChuanYueComponent', () => {
  let component: ChuanYueComponent;
  let fixture: ComponentFixture<ChuanYueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChuanYueComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChuanYueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
