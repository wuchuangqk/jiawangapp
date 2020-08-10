import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ZiChanWeiXiuComponent} from './zi-chan-wei-xiu/zi-chan-wei-xiu.component';
import {ApproveComponent} from './approve/approve.component';
import {ZiChanComponent} from './zi-chan.component';
import {TuDiGuanLiComponent} from './tu-di-guan-li/tu-di-guan-li.component';
import {TuDiGuanLiDetailComponent} from './tu-di-guan-li-detail/tu-di-guan-li-detail.component';
import {FangChanGuanLiComponent} from './fang-chan-guan-li/fang-chan-guan-li.component';
import {FangChanGuanLiDetailComponent} from './fang-chan-guan-li-detail/fang-chan-guan-li-detail.component';
import {ShangPuGuanLiComponent} from './shang-pu-guan-li/shang-pu-guan-li.component';
import {ShangPuGuanLiDetailComponent} from './shang-pu-guan-li-detail/shang-pu-guan-li-detail.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: ZiChanComponent
  // },
  {
    path: 'wei-xiu',
    component: ZiChanWeiXiuComponent
  },
  {
    path: 'approve',
    component: ApproveComponent
  },
  {
    path: 'tu-di-guan-li',
    component: TuDiGuanLiComponent
  },
  {
    path: 'tu-di-guan-li-detail',
    component: TuDiGuanLiDetailComponent
  },
  {
    path: 'fang-chan-guan-li',
    component: FangChanGuanLiComponent
  },
  {
    path: 'fang-chan-guan-li-detail',
    component: FangChanGuanLiDetailComponent
  },
  {
    path: 'shang-pu-guan-li',
    component: ShangPuGuanLiComponent
  },
  {
    path: 'shang-pu-guan-li-detail',
    component: ShangPuGuanLiDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZiChanRoutingModule { }
