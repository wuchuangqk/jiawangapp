import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextFlowComponent } from './next-flow.component';

describe('NextFlowComponent', () => {
  let component: NextFlowComponent;
  let fixture: ComponentFixture<NextFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextFlowComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
