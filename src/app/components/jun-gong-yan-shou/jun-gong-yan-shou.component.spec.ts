import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JunGongYanShouComponent } from './jun-gong-yan-shou.component';

describe('JunGongYanShouComponent', () => {
  let component: JunGongYanShouComponent;
  let fixture: ComponentFixture<JunGongYanShouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JunGongYanShouComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JunGongYanShouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
