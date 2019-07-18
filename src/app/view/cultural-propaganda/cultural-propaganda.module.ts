import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CulturalPropagandaRoutingModule } from './cultural-propaganda-routing.module';
import {IndexComponent} from './index/index.component';
import {AddComponent} from './add/add.component';
import {FormsModule} from '@angular/forms';
import {CommonComponentsModule} from '../../common-components/common-components.module';
import {IonicModule} from '@ionic/angular';
import {CulturalDetailComponent} from './cultural-detail/cultural-detail.component';

@NgModule({
  declarations: [
    IndexComponent,
    AddComponent,
      CulturalDetailComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CommonComponentsModule,
    CulturalPropagandaRoutingModule
  ]
})
export class CulturalPropagandaModule { }
