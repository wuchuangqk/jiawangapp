import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import {HomeTabComponent} from '../home-tab/home-tab.component';
import {OfficeTabPage} from '../office/office-tab-page.component';
import {ProjectPage} from '../project/project-page.component';
import {TabsRoutingModule} from './tabs-routing.module';
import {Tabs} from './tabs.component';
import {CommonComponentsModule} from '../common-components/common-components.module';
import {RongZiComponent} from '../rong-zi/rong-zi.component';
import {ZiChanComponent} from '../zi-chan/zi-chan.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CommonComponentsModule,
    TabsRoutingModule
  ],
  declarations: [HomeTabComponent, Tabs, OfficeTabPage, ProjectPage, ZiChanComponent, RongZiComponent]
})
export class TabsModule {}
