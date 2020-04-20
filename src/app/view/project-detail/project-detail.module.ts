import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectDetailRoutingModule } from './project-detail-routing.module';
import {IndexComponent} from './index/index.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {CommonComponentsModule} from '../../common-components/common-components.module';
import {ComponentsModule} from '../../components/components.module';
import {ZhaoBiaoDetailComponent} from './zhao-biao-detail/zhao-biao-detail.component';
import {HeTongDetailComponent} from './he-tong-detail/he-tong-detail.component';
import {BianGengDetailComponent} from './bian-geng-detail/bian-geng-detail.component';
import {YueBaoDetailComponent} from './yue-bao-detail/yue-bao-detail.component';
import {ZhiLiangAnQuanDetailComponent} from './zhi-liang-an-quan-detail/zhi-liang-an-quan-detail.component';
import {JunGongYanShouDetailComponent} from './jun-gong-yan-shou-detail/jun-gong-yan-shou-detail.component';

@NgModule({
  declarations: [
      IndexComponent,
      ZhaoBiaoDetailComponent,
      HeTongDetailComponent,
      BianGengDetailComponent,
      YueBaoDetailComponent,
      ZhiLiangAnQuanDetailComponent,
      JunGongYanShouDetailComponent,
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
