import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuDiGuanLiComponent } from './tu-di-guan-li.component';

describe('TuDiGuanLiComponent', () => {
  let component: TuDiGuanLiComponent;
  let fixture: ComponentFixture<TuDiGuanLiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuDiGuanLiComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuDiGuanLiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
