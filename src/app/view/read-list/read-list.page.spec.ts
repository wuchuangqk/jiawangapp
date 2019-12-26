import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadListPage } from './read-list.page';

describe('ReadListPage', () => {
  let component: ReadListPage;
  let fixture: ComponentFixture<ReadListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
