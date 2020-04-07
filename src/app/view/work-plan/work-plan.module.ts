import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkPlanRoutingModule } from './work-plan-routing.module';
import {AddComponent} from './add/add.component';
import {WorkDiaryPage} from './index/work-diary.page';
import {CommonComponentsModule} from '../../common-components/common-components.module';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {MonthPlanComponent} from './month-plan/month-plan.component';

@NgModule({
  declarations: [
      AddComponent,
      WorkDiaryPage,
      MonthPlanComponent,
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
