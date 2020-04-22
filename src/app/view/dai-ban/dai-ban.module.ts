import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DaiBanRoutingModule } from './dai-ban-routing.module';
import {IndexComponent} from './index/index.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {CommonComponentsModule} from '../../common-components/common-components.module';

@NgModule({
  declarations: [
      IndexComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CommonComponentsModule,
    DaiBanRoutingModule
  ]
})
export class DaiBanModule { }
