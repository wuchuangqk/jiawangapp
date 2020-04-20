import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GongChengHeTongComponent } from './gong-cheng-he-tong.component';

describe('GongChengHeTongComponent', () => {
  let component: GongChengHeTongComponent;
  let fixture: ComponentFixture<GongChengHeTongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GongChengHeTongComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GongChengHeTongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
