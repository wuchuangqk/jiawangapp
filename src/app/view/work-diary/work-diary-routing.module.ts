import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WorkDiaryPage} from './index/work-diary.page';
import {AddComponent} from './add/add.component';
import {ViewStaffWorkDiaryComponent} from './view-staff-work-diary/view-staff-work-diary.component';
import {StaffWorkDiaryComponent} from './staff-work-diary/staff-work-diary.component';

const routes: Routes = [
  { path: '', component: WorkDiaryPage },
  { path: 'add', component: AddComponent, },
  { path: 'view-staff-work-diary/:departid', component: ViewStaffWorkDiaryComponent, },
  { path: 'staff-work-diary', component: StaffWorkDiaryComponent, }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkDiaryRoutingModule { }
