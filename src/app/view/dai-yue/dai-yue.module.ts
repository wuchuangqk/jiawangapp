import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DaiYueRoutingModule } from './dai-yue-routing.module';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {CommonComponentsModule} from '../../common-components/common-components.module';
import {IndexComponent} from './index/index.component';

@NgModule({
  declarations: [
      IndexComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CommonComponentsModule,
    DaiYueRoutingModule
  ]
})
export class DaiYueModule { }
