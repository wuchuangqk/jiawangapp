import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JinDuJiHuaComponent } from './jin-du-ji-hua.component';

describe('JinDuJiHuaComponent', () => {
  let component: JinDuJiHuaComponent;
  let fixture: ComponentFixture<JinDuJiHuaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JinDuJiHuaComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JinDuJiHuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
