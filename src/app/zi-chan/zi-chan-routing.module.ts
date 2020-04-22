import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ZiChanWeiXiuComponent} from './zi-chan-wei-xiu/zi-chan-wei-xiu.component';
import {ApproveComponent} from './approve/approve.component';

const routes: Routes = [
  {
    path: 'wei-xiu',
    component: ZiChanWeiXiuComponent
  },
  {
    path: 'approve',
    component: ApproveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZiChanRoutingModule { }
