import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DongTaiZiJinDetailComponent } from './dong-tai-zi-jin-detail.component';

describe('DongTaiZiJinDetailComponent', () => {
  let component: DongTaiZiJinDetailComponent;
  let fixture: ComponentFixture<DongTaiZiJinDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DongTaiZiJinDetailComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DongTaiZiJinDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
