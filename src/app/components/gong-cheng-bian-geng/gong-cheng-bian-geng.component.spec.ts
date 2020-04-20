import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GongChengBianGengComponent } from './gong-cheng-bian-geng.component';

describe('GongChengBianGengComponent', () => {
  let component: GongChengBianGengComponent;
  let fixture: ComponentFixture<GongChengBianGengComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GongChengBianGengComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GongChengBianGengComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
