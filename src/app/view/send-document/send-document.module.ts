import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendDocumentRoutingModule } from './send-document-routing.module';
import {IndexComponent} from './index/index.component';
import {CommonComponentsModule} from '../../common-components/common-components.module';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {ReceiveDetailComponent} from "./receive-detail/receive-detail.component";
import {ReceiveHandleComponent} from "./receive-handle/receive-handle.component";
import {ChuanYueComponent} from "./chuan-yue/chuan-yue.component";
import {JiaQianComponent} from "./jia-qian/jia-qian.component";
import {JianQianComponent} from "./jian-qian/jian-qian.component";

@NgModule({
  declarations: [
    IndexComponent,
    ReceiveDetailComponent,
    ReceiveHandleComponent,
    ChuanYueComponent,
    JiaQianComponent,
    JianQianComponent,
  ],
  entryComponents:[
    JiaQianComponent
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
