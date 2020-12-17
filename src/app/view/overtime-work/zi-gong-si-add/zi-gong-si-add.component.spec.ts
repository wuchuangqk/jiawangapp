import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZiGongSiAddComponent } from './zi-gong-si-add.component';

describe('ZiGongSiAddComponent', () => {
  let component: ZiGongSiAddComponent;
  let fixture: ComponentFixture<ZiGongSiAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZiGongSiAddComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZiGongSiAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
