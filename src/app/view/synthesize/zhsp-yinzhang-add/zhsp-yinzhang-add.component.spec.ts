import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZhspYinzhangAddComponent } from './zhsp-yinzhang-add.component';

describe('ZhspYinzhangAddComponent', () => {
  let component: ZhspYinzhangAddComponent;
  let fixture: ComponentFixture<ZhspYinzhangAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZhspYinzhangAddComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZhspYinzhangAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
