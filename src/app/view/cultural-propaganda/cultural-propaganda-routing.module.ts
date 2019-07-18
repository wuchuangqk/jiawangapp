import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from './index/index.component';
import {AddComponent} from './add/add.component';
import {CulturalDetailComponent} from './cultural-detail/cultural-detail.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'add', component: AddComponent },
  { path: 'detail', component: CulturalDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CulturalPropagandaRoutingModule { }
