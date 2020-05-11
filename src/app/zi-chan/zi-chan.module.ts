import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZiChanRoutingModule } from './zi-chan-routing.module';
import {ZiChanWeiXiuComponent} from './zi-chan-wei-xiu/zi-chan-wei-xiu.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {CommonComponentsModule} from '../common-components/common-components.module';
import {ApproveComponent} from './approve/approve.component';
import {ZiChanComponent} from './zi-chan.component';
import {TuDiGuanLiComponent} from './tu-di-guan-li/tu-di-guan-li.component';
import {TuDiGuanLiDetailComponent} from './tu-di-guan-li-detail/tu-di-guan-li-detail.component';
import {FangChanGuanLiComponent} from './fang-chan-guan-li/fang-chan-guan-li.component';
import {FangChanGuanLiDetailComponent} from './fang-chan-guan-li-detail/fang-chan-guan-li-detail.component';
import {ShangPuGuanLiComponent} from './shang-pu-guan-li/shang-pu-guan-li.component';
import {ShangPuGuanLiDetailComponent} from './shang-pu-guan-li-detail/shang-pu-guan-li-detail.component';

@NgModule({
  declarations: [
      ZiChanComponent,
      ZiChanWeiXiuComponent,
      ApproveComponent,
      TuDiGuanLiComponent,
      TuDiGuanLiDetailComponent,
      FangChanGuanLiComponent,
      FangChanGuanLiDetailComponent,
      ShangPuGuanLiComponent,
      ShangPuGuanLiDetailComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CommonComponentsModule,
    ZiChanRoutingModule
  ]
})
export class ZiChanModule { }
