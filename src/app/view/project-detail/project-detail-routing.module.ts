import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from './index/index.component';
import {ZhaoBiaoDetailComponent} from './zhao-biao-detail/zhao-biao-detail.component';
import {HeTongDetailComponent} from './he-tong-detail/he-tong-detail.component';
import {BianGengDetailComponent} from './bian-geng-detail/bian-geng-detail.component';
import {YueBaoDetailComponent} from './yue-bao-detail/yue-bao-detail.component';
import {ZhiLiangAnQuanDetailComponent} from './zhi-liang-an-quan-detail/zhi-liang-an-quan-detail.component';
import {JunGongYanShouDetailComponent} from './jun-gong-yan-shou-detail/jun-gong-yan-shou-detail.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'zhao-biao-detail',
    component: ZhaoBiaoDetailComponent
  },
  {
    path: 'he-tong-detail',
    component: HeTongDetailComponent
  },
  {
    path: 'bian-geng-detail',
    component: BianGengDetailComponent
  },
  {
    path: 'yue-bao-detail',
    component: YueBaoDetailComponent
  },
  {
    path: 'zhi-liang-an-quan-detail',
    component: ZhiLiangAnQuanDetailComponent,
  },
  {
    path: 'jun-gong-yan-shou-detail',
    component: JunGongYanShouDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectDetailRoutingModule { }
