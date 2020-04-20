import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZiChanComponent } from './zi-chan.component';

describe('ZiChanComponent', () => {
  let component: ZiChanComponent;
  let fixture: ComponentFixture<ZiChanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZiChanComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZiChanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
