import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { ZiJinZhiFuRoutingModule } from './zi-jin-zhi-fu-routing.module';
import {IndexComponent} from './index/index.component';
import {DetailComponent} from './detail/detail.component';
import {ApprovalComponent} from './approval/approval.component';
import {IonicModule} from '@ionic/angular';
import {CommonComponentsModule} from '../../common-components/common-components.module';
import {SignaturePadModule} from 'angular2-signaturepad';
import {JiaQianComponent} from './jia-qian/jia-qian.component';

@NgModule({
  declarations: [
    IndexComponent,
    DetailComponent,
    ApprovalComponent,
    JiaQianComponent
  ],
  imports: [
    CommonModule,
    ZiJinZhiFuRoutingModule,
    IonicModule,
    CommonComponentsModule,
    FormsModule,
    SignaturePadModule
  ]
})
export class ZiJinZhiFuModule { }
