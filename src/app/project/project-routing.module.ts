import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyProjectComponent} from './my-project/my-project.component';
import {XiangMuJinDuComponent} from './xiang-mu-jin-du/xiang-mu-jin-du.component';
import {MyShenPiListComponent} from './my-shen-pi-list/my-shen-pi-list.component';
import {ApproveComponent} from './approve/approve.component';

const routes: Routes = [
  {
    path: 'my-project',
    component: MyProjectComponent
  },
  {
    path: 'xiang-mu-jin-du',
    component: XiangMuJinDuComponent
  },
  {
    path: 'my-shen-pi-list',
    component: MyShenPiListComponent
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
export class ProjectRoutingModule { }
