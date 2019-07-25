import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from './index/index.component';
import {StaffSelectComponent} from './staff-select/staff-select.component';
import {AddComponent} from './add/add.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'add', component: AddComponent },
  { path: 'staff-select/:depart_id', component: StaffSelectComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceiveDocumentRoutingModule { }
