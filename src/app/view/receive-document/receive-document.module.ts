import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceiveDocumentRoutingModule } from './receive-document-routing.module';
import {IndexComponent} from './index/index.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {CommonComponentsModule} from '../../common-components/common-components.module';
import {StaffSelectComponent} from './staff-select/staff-select.component';
import {AddComponent} from './add/add.component';
import {ReceiveDetailComponent} from './receive-detail/receive-detail.component';
import {ReceiveHandleComponent} from './receive-handle/receive-handle.component';
import {ComponentsModule} from '../../components/components.module';
import {SignaturePadModule} from "angular2-signaturepad";
import {JiaQianComponent} from "./jia-qian/jia-qian.component";
import {JianQianComponent} from "./jian-qian/jian-qian.component";

@NgModule({
    declarations: [
        IndexComponent,
        StaffSelectComponent,
        AddComponent,
        ReceiveDetailComponent,
        ReceiveHandleComponent,
        JiaQianComponent,
        JianQianComponent,
    ],
    // entryComponents:[
    //     JiaQianComponent
    // ],
    imports: [
        CommonComponentsModule,
        CommonModule,
        IonicModule,
        FormsModule,
        ReceiveDocumentRoutingModule,
        ComponentsModule,
        SignaturePadModule
    ]
})
export class ReceiveDocumentModule { }
