import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GongChengZiLiaoComponent } from './gong-cheng-zi-liao.component';

describe('GongChengZiLiaoComponent', () => {
  let component: GongChengZiLiaoComponent;
  let fixture: ComponentFixture<GongChengZiLiaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GongChengZiLiaoComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GongChengZiLiaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
