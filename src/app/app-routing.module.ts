import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {NoticeComponent} from './view/notice/notice.component';
import {CommonViewComponent} from './view/common-view/common-view.component';
import {DetailComponent} from './view/detail/detail.component';
import {DocumentHandleComponent} from './view/document-handle/document-handle.component';

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


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
