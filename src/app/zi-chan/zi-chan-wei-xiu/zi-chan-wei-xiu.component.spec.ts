import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZiChanWeiXiuComponent } from './zi-chan-wei-xiu.component';

describe('ZiChanWeiXiuComponent', () => {
  let component: ZiChanWeiXiuComponent;
  let fixture: ComponentFixture<ZiChanWeiXiuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZiChanWeiXiuComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZiChanWeiXiuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
