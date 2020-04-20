import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZhiLiangAnQuanDetailComponent } from './zhi-liang-an-quan-detail.component';

describe('ZhiLiangAnQuanDetailComponent', () => {
  let component: ZhiLiangAnQuanDetailComponent;
  let fixture: ComponentFixture<ZhiLiangAnQuanDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZhiLiangAnQuanDetailComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZhiLiangAnQuanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
