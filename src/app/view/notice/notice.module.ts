import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticeRoutingModule } from './notice-routing.module';
import {IndexComponent} from './index/index.component';
import {AddComponent} from './add/add.component';
import {FormsModule} from '@angular/forms';
import {CommonComponentsModule} from '../../common-components/common-components.module';
import {IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [
    IndexComponent,
    AddComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CommonComponentsModule,
    NoticeRoutingModule
  ]
})
export class NoticeModule { }
