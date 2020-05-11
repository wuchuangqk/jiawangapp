import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FangChanGuanLiDetailComponent } from './fang-chan-guan-li-detail.component';

describe('FangChanGuanLiDetailComponent', () => {
  let component: FangChanGuanLiDetailComponent;
  let fixture: ComponentFixture<FangChanGuanLiDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FangChanGuanLiDetailComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FangChanGuanLiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
