import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {NoticeComponent} from './view/notice/notice.component';
import {CommonViewComponent} from './view/common-view/common-view.component';
import {DetailComponent} from './view/receive-document/detail/detail.component';
import {DocumentHandleComponent} from './view/receive-document/document-handle/document-handle.component';
import {DocumentApproveComponent} from './view/receive-document/document-approve/document-approve.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './view/home/home.module#HomePageModule'
  },
  { path: 'login', loadChildren: './view/login/login.module#LoginPageModule'},

  { path: 'notice', component: NoticeComponent },
  { path: 'common_view', component: CommonViewComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'work-diary', loadChildren: './view/work-diary/work-diary.module#WorkDiaryModule' },
  { path: 'receive-document', loadChildren: './view/receive-document/receive-document.module#ReceiveDocumentModule' },
  { path: 'send-document', loadChildren: './view/send-document/send-document.module#SendDocumentModule' },
  { path: 'document-handle', component: DocumentHandleComponent },
  { path: 'document-approve', component: DocumentApproveComponent },
  { path: 'assign', loadChildren: './view/assign/assign.module#AssignModule' },
  { path: 'leave', loadChildren: './view/leave/leave.module#LeaveModule' },
  { path: 'overtime-work', loadChildren: './view/overtime-work/overtime-work.module#OvertimeWorkModule' },
  { path: 'go-out', loadChildren: './view/go-out/go-out.module#GoOutModule' },
  { path: 'synthesize', loadChildren: './view/synthesize/synthesize.module#SynthesizeModule' },
  { path: 'property', loadChildren: './view/property/property.module#PropertyModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
