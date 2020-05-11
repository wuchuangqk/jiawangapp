import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DongTaiZiJinComponent } from './dong-tai-zi-jin.component';

describe('DongTaiZiJinComponent', () => {
  let component: DongTaiZiJinComponent;
  let fixture: ComponentFixture<DongTaiZiJinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DongTaiZiJinComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DongTaiZiJinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
