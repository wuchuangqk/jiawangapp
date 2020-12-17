import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from './index/index.component';
import {AddComponent} from './add/add.component';
import {DetailComponent} from './detail/detail.component';
import {ApproveComponent} from './approve/approve.component';
import {ZhspYinzhangAddComponent} from './zhsp-yinzhang-add/zhsp-yinzhang-add.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'add', component: AddComponent },
  { path: 'zhsp-yinzhang-add', component: ZhspYinzhangAddComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'approve', component: ApproveComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SynthesizeRoutingModule { }
