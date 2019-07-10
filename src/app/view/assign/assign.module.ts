import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignRoutingModule } from './assign-routing.module';
import {IndexComponent} from './index/index.component';
import {CommonComponentsModule} from '../../common-components/common-components.module';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {AddComponent} from './add/add.component';

@NgModule({
  declarations: [
      IndexComponent,
      AddComponent,
  ],
  imports: [
    CommonModule,
    CommonComponentsModule,
    IonicModule,
    FormsModule,
    AssignRoutingModule
  ]
})
export class AssignModule { }
