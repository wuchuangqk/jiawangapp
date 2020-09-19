import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendDocumentRoutingModule } from './send-document-routing.module';
import {IndexComponent} from './index/index.component';
import {CommonComponentsModule} from '../../common-components/common-components.module';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {ReceiveDetailComponent} from "./receive-detail/receive-detail.component";
import {ReceiveHandleComponent} from "./receive-handle/receive-handle.component";

@NgModule({
  declarations: [
    IndexComponent,
    ReceiveDetailComponent,
    ReceiveHandleComponent,
  ],
  imports: [
    CommonModule,
    CommonComponentsModule,
    IonicModule,
    FormsModule,
    SendDocumentRoutingModule
  ]
})
export class SendDocumentModule { }
