import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import {HuiZongTongJiComponent} from './hui-zong-tong-ji/hui-zong-tong-ji.component';
import {DongTaiZiJinComponent} from './dong-tai-zi-jin/dong-tai-zi-jin.component';
import {CaiWuZhiFuComponent} from './cai-wu-zhi-fu/cai-wu-zhi-fu.component';
import {DongTaiZiJinDetailComponent} from './dong-tai-zi-jin-detail/dong-tai-zi-jin-detail.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'hui-zong-tong-ji',
    component: HuiZongTongJiComponent,
  },
  {
    path: 'dong-tai-zi-jin',
    component: DongTaiZiJinComponent
  },
  {
    path: 'cai-wu-zhi-fu',
    component: CaiWuZhiFuComponent
  },
  {
    path: 'dong-tai-zi-jin-detail',
    component: DongTaiZiJinDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecisionMakingPlatformRoutingModule { }
