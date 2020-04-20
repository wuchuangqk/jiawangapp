import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tabs } from './tabs.component';

describe('TabsPage', () => {
  let component: Tabs;
  let fixture: ComponentFixture<Tabs>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Tabs],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tabs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
