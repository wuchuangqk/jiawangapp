import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OvertimeWorkRoutingModule } from './overtime-work-routing.module';
import {IndexComponent} from './index/index.component';
import {AddComponent} from './add/add.component';
import {DetailComponent} from './detail/detail.component';
import {ApproveComponent} from './approve/approve.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {CommonComponentsModule} from '../../common-components/common-components.module';
import {NgZorroAntdMobileModule} from 'ng-zorro-antd-mobile';
import {JiTuanAddComponent} from './ji-tuan-add/ji-tuan-add.component';
import {ZiGongSiAddComponent} from './zi-gong-si-add/zi-gong-si-add.component';

@NgModule({
  declarations: [
    IndexComponent,
    AddComponent,
    DetailComponent,
    ApproveComponent,
    JiTuanAddComponent,
    ZiGongSiAddComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CommonComponentsModule,
    OvertimeWorkRoutingModule,
    NgZorroAntdMobileModule
  ]
})
export class OvertimeWorkModule { }
