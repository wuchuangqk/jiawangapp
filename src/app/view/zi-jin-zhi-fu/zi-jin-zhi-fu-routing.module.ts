import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {DetailComponent} from './detail/detail.component';
import {ApprovalComponent} from './approval/approval.component';
import {JiaQianComponent} from './jia-qian/jia-qian.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'detail', component: DetailComponent},
  {path: 'approve', component: ApprovalComponent},
  {path: 'jia-qian', component: JiaQianComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZiJinZhiFuRoutingModule {
}
