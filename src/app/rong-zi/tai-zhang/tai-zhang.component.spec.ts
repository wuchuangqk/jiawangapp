import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaiZhangComponent } from './tai-zhang.component';

describe('TaiZhangComponent', () => {
  let component: TaiZhangComponent;
  let fixture: ComponentFixture<TaiZhangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaiZhangComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaiZhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
