import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YiBanShouWenComponent } from './yi-ban-shou-wen.component';

describe('YiBanShouWenComponent', () => {
  let component: YiBanShouWenComponent;
  let fixture: ComponentFixture<YiBanShouWenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YiBanShouWenComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YiBanShouWenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
