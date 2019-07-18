import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturalComponent } from './cultural.component';

describe('CulturalComponent', () => {
  let component: CulturalComponent;
  let fixture: ComponentFixture<CulturalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CulturalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CulturalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
