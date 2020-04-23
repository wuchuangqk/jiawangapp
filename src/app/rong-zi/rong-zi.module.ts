import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RongZiRoutingModule } from './rong-zi-routing.module';
import {RongZiComponent} from './rong-zi.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {CommonComponentsModule} from '../common-components/common-components.module';

@NgModule({
  declarations: [
      RongZiComponent
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
