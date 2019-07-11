import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SynthesizeRoutingModule } from './synthesize-routing.module';
import {IndexComponent} from './index/index.component';
import {AddComponent} from './add/add.component';
import {DetailComponent} from './detail/detail.component';
import {ApproveComponent} from './approve/approve.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {CommonComponentsModule} from '../../common-components/common-components.module';

@NgModule({
  declarations: [
    IndexComponent,
    AddComponent,
    DetailComponent,
    ApproveComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CommonComponentsModule,
    SynthesizeRoutingModule
  ]
})
export class SynthesizeModule { }
