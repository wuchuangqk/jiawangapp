import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import {RongZiComponent} from './rong-zi.component';
import {TaiZhangComponent} from './tai-zhang/tai-zhang.component';
import {RongZiShengPiComponent} from "./rong-zi-sheng-pi/rong-zi-sheng-pi.component";
import {ShengPiDetailComponent} from "./sheng-pi-detail/sheng-pi-detail.component";

const routes: Routes = [
  // {
  //   path: 'tabs/rong-zi',
  //   component: RongZiComponent
  // },

  {
    path: 'sheng-pi-detail',
    component: ShengPiDetailComponent
  },
  {
    path: 'rong-zi-shen-pi',
    component: RongZiShengPiComponent
  },
  {
    path: 'tai-zhang',
    component: TaiZhangComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RongZiRoutingModule { }
