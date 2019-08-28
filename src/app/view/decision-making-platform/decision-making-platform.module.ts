import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecisionMakingPlatformRoutingModule } from './decision-making-platform-routing.module';
import { IndexComponent } from './index/index.component';
import {IonicModule} from '@ionic/angular';
import {CommonComponentsModule} from '../../common-components/common-components.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    IndexComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CommonComponentsModule,
    DecisionMakingPlatformRoutingModule
  ]
})
export class DecisionMakingPlatformModule { }
