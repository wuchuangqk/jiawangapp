import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from './index/index.component';
import {AddComponent} from './add/add.component';
import {ExchangeAddComponent} from './exchange-add/exchange-add.component';
import {ExchangeViewComponent} from './exchange-view/common-view.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'add', component: AddComponent },
  { path: 'exchange-add', component: ExchangeAddComponent },
  { path: 'exchange-view/:id', component: ExchangeViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticeRoutingModule { }
