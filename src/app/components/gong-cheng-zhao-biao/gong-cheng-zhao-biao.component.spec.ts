import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GongChengZhaoBiaoComponent } from './gong-cheng-zhao-biao.component';

describe('GongChengZhaoBiaoComponent', () => {
  let component: GongChengZhaoBiaoComponent;
  let fixture: ComponentFixture<GongChengZhaoBiaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GongChengZhaoBiaoComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GongChengZhaoBiaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
