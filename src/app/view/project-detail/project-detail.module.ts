import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectDetailRoutingModule } from './project-detail-routing.module';
import {IndexComponent} from './index/index.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {CommonComponentsModule} from '../../common-components/common-components.module';
import {ComponentsModule} from '../../components/components.module';
import {ZhaoBiaoDetailComponent} from './zhao-biao-detail/zhao-biao-detail.component';

@NgModule({
  declarations: [
      IndexComponent,
      ZhaoBiaoDetailComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CommonComponentsModule,
    ComponentsModule,
    ProjectDetailRoutingModule
  ]
})
export class ProjectDetailModule { }
