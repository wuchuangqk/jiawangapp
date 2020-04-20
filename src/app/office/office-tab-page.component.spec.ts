import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { OfficeTabPage } from './office-tab-page.component';

describe('Tab2Page', () => {
  let component: OfficeTabPage;
  let fixture: ComponentFixture<OfficeTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OfficeTabPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(OfficeTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
