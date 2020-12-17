import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JiTuanAddComponent } from './ji-tuan-add.component';

describe('JiTuanAddComponent', () => {
  let component: JiTuanAddComponent;
  let fixture: ComponentFixture<JiTuanAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JiTuanAddComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JiTuanAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
