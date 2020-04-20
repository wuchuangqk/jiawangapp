import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZhiLiangAnQuanComponent } from './zhi-liang-an-quan.component';

describe('ZhiLiangAnQuanComponent', () => {
  let component: ZhiLiangAnQuanComponent;
  let fixture: ComponentFixture<ZhiLiangAnQuanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZhiLiangAnQuanComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZhiLiangAnQuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
