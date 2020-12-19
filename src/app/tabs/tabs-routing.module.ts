import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeTabComponent} from '../home-tab/home-tab.component';
import {OfficeTabPage} from '../office/office-tab-page.component';
import {ProjectPage} from '../project/project-page.component';
import {Tabs} from './tabs.component';
import {PersionInfoComponent} from '../view/persion-info/persion-info.component';
import {RongZiComponent} from '../rong-zi/rong-zi.component';
import {ZiChanComponent} from '../zi-chan/zi-chan.component';
// import {RongZiComponent} from '../rong-zi/rong-zi.component';
// import {ZiChanComponent} from '../zi-chan/zi-chan.component';

const routes: Routes = [
  {
    path: '',
    component: Tabs,
    children: [
      {path: 'home-tab', component: HomeTabComponent },
      {path: 'office', component: OfficeTabPage },
      {path: 'project', component: ProjectPage },
      {path: 'rong-zi', component: RongZiComponent },
      {path: 'zi-chan', component: ZiChanComponent },
      {path: '', redirectTo: '/tabs/home-tab', pathMatch: 'full'}
    ]
  },
  {path: '', redirectTo: '/tabs/home-tab', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule {}
