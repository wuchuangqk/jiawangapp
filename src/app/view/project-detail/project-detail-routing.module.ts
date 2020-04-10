import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from './index/index.component';
import {ZhaoBiaoDetailComponent} from './zhao-biao-detail/zhao-biao-detail.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'zhao-biao-detail',
    component: ZhaoBiaoDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectDetailRoutingModule { }
