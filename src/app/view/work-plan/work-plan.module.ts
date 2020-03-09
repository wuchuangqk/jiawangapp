import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkPlanRoutingModule } from './work-plan-routing.module';
import {AddComponent} from './add/add.component';
import {WorkDiaryPage} from './index/work-diary.page';
import {CommonComponentsModule} from '../../common-components/common-components.module';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AddComponent,
      WorkDiaryPage
  ],
  imports: [
    CommonComponentsModule,
    CommonModule,
    IonicModule,
    FormsModule,
    WorkPlanRoutingModule
  ]
})
export class WorkPlanModule { }
