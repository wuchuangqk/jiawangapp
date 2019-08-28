import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullMapRoutingModule } from './full-map-routing.module';
import {IonicModule} from '@ionic/angular';
import {CommonComponentsModule} from '../../common-components/common-components.module';
import {FormsModule} from '@angular/forms';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [
      IndexComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    CommonComponentsModule,
    FormsModule,
    FullMapRoutingModule
  ]
})
export class FullMapModule { }
