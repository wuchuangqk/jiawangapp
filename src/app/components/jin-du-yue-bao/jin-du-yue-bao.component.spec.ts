import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JinDuYueBaoComponent } from './jin-du-yue-bao.component';

describe('JinDuYueBaoComponent', () => {
  let component: JinDuYueBaoComponent;
  let fixture: ComponentFixture<JinDuYueBaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JinDuYueBaoComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JinDuYueBaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
