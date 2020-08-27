import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RongZiRoutingModule } from './rong-zi-routing.module';
// import {RongZiComponent} from './rong-zi.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {CommonComponentsModule} from '../common-components/common-components.module';
import {TaiZhangComponent} from './tai-zhang/tai-zhang.component';
import {RongZiShengPiComponent} from "./rong-zi-sheng-pi/rong-zi-sheng-pi.component";
import {ShengPiDetailComponent} from "./sheng-pi-detail/sheng-pi-detail.component";

@NgModule({
  declarations: [
      // RongZiComponent,
      TaiZhangComponent,
      RongZiShengPiComponent,
      ShengPiDetailComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CommonComponentsModule,
    RongZiRoutingModule
  ]
})
export class RongZiModule { }
