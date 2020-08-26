import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZiChanFenBuComponent } from './zi-chan-fen-bu.component';

describe('ZiChanFenBuComponent', () => {
  let component: ZiChanFenBuComponent;
  let fixture: ComponentFixture<ZiChanFenBuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZiChanFenBuComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZiChanFenBuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
