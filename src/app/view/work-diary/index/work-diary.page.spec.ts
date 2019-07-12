import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkDiaryPage } from './work-diary.page';

describe('WorkDiaryPage', () => {
  let component: WorkDiaryPage;
  let fixture: ComponentFixture<WorkDiaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkDiaryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkDiaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
