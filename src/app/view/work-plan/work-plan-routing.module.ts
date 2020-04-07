import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WorkDiaryPage} from './index/work-diary.page';
import {AddComponent} from './add/add.component';
import {MonthPlanComponent} from './month-plan/month-plan.component';

const routes: Routes = [

  { path: '', component: WorkDiaryPage },
  { path: 'add', component: AddComponent, },
  { path: 'month-plan', component: MonthPlanComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkPlanRoutingModule { }
