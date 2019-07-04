import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WorkDiaryPage} from './work-diary.page';
import {AddComponent} from './add/add.component';

const routes: Routes = [
  { path: '', component: WorkDiaryPage },
  { path: 'add', component: AddComponent, }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkDiaryRoutingModule { }
