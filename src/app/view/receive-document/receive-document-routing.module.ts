import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from './index/index.component';
import {StaffSelectComponent} from './staff-select/staff-select.component';
import {AddComponent} from './add/add.component';
import {ReceiveDetailComponent} from './receive-detail/receive-detail.component';
import {ReceiveHandleComponent} from './receive-handle/receive-handle.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'add', component: AddComponent },
  { path: 'staff-select/:depart_id', component: StaffSelectComponent},
  { path: 'receive-detail/:id', component: ReceiveDetailComponent},
  { path: 'receive-handle/:id', component: ReceiveHandleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceiveDocumentRoutingModule { }
