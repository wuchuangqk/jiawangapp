import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RongZiComponent } from './rong-zi.component';

describe('RongZiComponent', () => {
  let component: RongZiComponent;
  let fixture: ComponentFixture<RongZiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RongZiComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RongZiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
