import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceiveDocumentRoutingModule } from './receive-document-routing.module';
import {IndexComponent} from './index/index.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {CommonComponentsModule} from '../../common-components/common-components.module';

@NgModule({
  declarations: [
    IndexComponent,
  ],
  imports: [
    CommonComponentsModule,
    CommonModule,
    IonicModule,
    FormsModule,
    ReceiveDocumentRoutingModule
  ]
})
export class ReceiveDocumentModule { }
