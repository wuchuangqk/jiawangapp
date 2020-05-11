import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FangChanGuanLiComponent } from './fang-chan-guan-li.component';

describe('FangChanGuanLiComponent', () => {
  let component: FangChanGuanLiComponent;
  let fixture: ComponentFixture<FangChanGuanLiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FangChanGuanLiComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FangChanGuanLiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
