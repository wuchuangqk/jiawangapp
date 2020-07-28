import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import {RongZiComponent} from './rong-zi.component';
import {TaiZhangComponent} from './tai-zhang/tai-zhang.component';

const routes: Routes = [
  // {
  //   path: 'tabs/rong-zi',
  //   component: RongZiComponent
  // },
  {
    path: 'tai-zhang',
    component: TaiZhangComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RongZiRoutingModule { }
