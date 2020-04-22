import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XiangMuJinDuComponent } from './xiang-mu-jin-du.component';

describe('XiangMuJinDuComponent', () => {
  let component: XiangMuJinDuComponent;
  let fixture: ComponentFixture<XiangMuJinDuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XiangMuJinDuComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XiangMuJinDuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
