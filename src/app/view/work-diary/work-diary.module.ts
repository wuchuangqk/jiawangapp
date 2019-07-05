import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkDiaryRoutingModule } from './work-diary-routing.module';
import {WorkDiaryPage} from './work-diary.page';
import {AddComponent} from './add/add.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {CommonComponentsModule} from '../../common-components/common-components.module';

@NgModule({
    declarations: [
        WorkDiaryPage,
        AddComponent,
    ],
    imports: [
        CommonComponentsModule,
        CommonModule,
        IonicModule,
        WorkDiaryRoutingModule,
        FormsModule
    ]
})
export class WorkDiaryModule { }
