import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RongZiShengPiComponent } from './rong-zi-sheng-pi.component';

describe('RongZiShengPiComponent', () => {
  let component: RongZiShengPiComponent;
  let fixture: ComponentFixture<RongZiShengPiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RongZiShengPiComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RongZiShengPiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
