import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuiZongTongJiComponent } from './hui-zong-tong-ji.component';

describe('HuiZongTongJiComponent', () => {
  let component: HuiZongTongJiComponent;
  let fixture: ComponentFixture<HuiZongTongJiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuiZongTongJiComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuiZongTongJiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
