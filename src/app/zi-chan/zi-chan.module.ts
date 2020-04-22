import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZiChanRoutingModule } from './zi-chan-routing.module';
import {ZiChanWeiXiuComponent} from './zi-chan-wei-xiu/zi-chan-wei-xiu.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {CommonComponentsModule} from '../common-components/common-components.module';
import {ApproveComponent} from './approve/approve.component';

@NgModule({
  declarations: [
      ZiChanWeiXiuComponent,
      ApproveComponent
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
