import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RongZiComponent} from './rong-zi.component';

const routes: Routes = [
  {
    path: '',
    component: RongZiComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RongZiRoutingModule { }
