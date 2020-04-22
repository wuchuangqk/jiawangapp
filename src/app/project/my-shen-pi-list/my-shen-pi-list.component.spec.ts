import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyShenPiListComponent } from './my-shen-pi-list.component';

describe('MyShenPiListComponent', () => {
  let component: MyShenPiListComponent;
  let fixture: ComponentFixture<MyShenPiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyShenPiListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyShenPiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
