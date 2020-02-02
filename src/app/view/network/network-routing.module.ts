import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NetworkSettingComponent} from './network-setting/network-setting.component';
import {AddComponent} from './add/add.component';
import {ViewComponent} from './view/view.component';

const routes: Routes = [
  { path: '', component: NetworkSettingComponent, },
  { path: 'add', component: AddComponent },
  {path: 'view', component: ViewComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetworkRoutingModule { }
