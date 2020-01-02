import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchiveManagementRoutingModule } from './archive-management-routing.module';
import {IndexComponent} from './index/index.component';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {CommonComponentsModule} from '../../common-components/common-components.module';
import {DetailComponent} from './detail/detail.component';

@NgModule({
  declarations: [
      IndexComponent,
      DetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommonComponentsModule,
    ArchiveManagementRoutingModule
  ]
})
export class ArchiveManagementModule { }
