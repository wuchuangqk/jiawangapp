import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShangPuGuanLiDetailComponent } from './shang-pu-guan-li-detail.component';

describe('ShangPuGuanLiDetailComponent', () => {
  let component: ShangPuGuanLiDetailComponent;
  let fixture: ComponentFixture<ShangPuGuanLiDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShangPuGuanLiDetailComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShangPuGuanLiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
