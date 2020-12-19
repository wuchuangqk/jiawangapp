import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LeaveRoutingModule} from './leave-routing.module';
import {IndexComponent} from './index/index.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {CommonComponentsModule} from '../../common-components/common-components.module';
import {AddComponent} from './add/add.component';
import {DetailComponent} from './detail/detail.component';
import {ApproveComponent} from './approve/approve.component';
import {SelectFlowComponent} from './select-flow/select-flow.component';

@NgModule({
  declarations: [
    IndexComponent,
    AddComponent,
    DetailComponent,
    ApproveComponent,
    SelectFlowComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CommonComponentsModule,
    LeaveRoutingModule
  ]
})
export class LeaveModule {
}
