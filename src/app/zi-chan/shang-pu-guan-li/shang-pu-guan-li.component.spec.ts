import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShangPuGuanLiComponent } from './shang-pu-guan-li.component';

describe('ShangPuGuanLiComponent', () => {
  let component: ShangPuGuanLiComponent;
  let fixture: ComponentFixture<ShangPuGuanLiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShangPuGuanLiComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShangPuGuanLiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
