import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaiWuZhiFuComponent } from './cai-wu-zhi-fu.component';

describe('CaiWuZhiFuComponent', () => {
  let component: CaiWuZhiFuComponent;
  let fixture: ComponentFixture<CaiWuZhiFuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaiWuZhiFuComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaiWuZhiFuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
