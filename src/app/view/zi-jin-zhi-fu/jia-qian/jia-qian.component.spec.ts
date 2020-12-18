import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JiaQianComponent } from './jia-qian.component';

describe('JiaQianComponent', () => {
  let component: JiaQianComponent;
  let fixture: ComponentFixture<JiaQianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JiaQianComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JiaQianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
