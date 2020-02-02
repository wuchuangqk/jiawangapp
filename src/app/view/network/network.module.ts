import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NetworkRoutingModule } from './network-routing.module';
import {NetworkSettingComponent} from './network-setting/network-setting.component';
import {AddComponent} from './add/add.component';
import {IonicModule} from '@ionic/angular';
import {CommonComponentsModule} from '../../common-components/common-components.module';
import {FormsModule} from '@angular/forms';
import {ViewComponent} from './view/view.component';

@NgModule({
  declarations: [
      NetworkSettingComponent,
      AddComponent,
      ViewComponent,
  ],
  imports: [
    CommonModule,
      IonicModule,
      FormsModule,
      CommonComponentsModule,
    NetworkRoutingModule
  ]
})
export class NetworkModule { }
