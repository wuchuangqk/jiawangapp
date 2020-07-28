import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {CommonViewComponent} from './view/common-view/common-view.component';
import {DetailComponent} from './view/receive-document/detail/detail.component';
import {DocumentHandleComponent} from './view/receive-document/document-handle/document-handle.component';
import {DocumentApproveComponent} from './view/receive-document/document-approve/document-approve.component';
import {PersionInfoComponent} from './view/persion-info/persion-info.component';
import {FeedbackComponent} from './view/feedback/feedback.component';
import {EditComponent} from './view/edit/edit.component';
import {PdfViewerPageComponent} from './pdf-viewer-page/pdf-viewer-page.component';
// import {NetworkSettingComponent} from './view/network/network-setting/network-setting.component';

// @ts-ignore
const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
 //    {path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)},

    { path: 'pdf', component: PdfViewerPageComponent },
    { path: 'tabs', loadChildren: './tabs/tabs.module#TabsModule' },
    { path: 'home', loadChildren: './view/home/home.module#HomePageModule'},
    { path: 'login', loadChildren: './view/login/login.module#LoginPageModule'},
    { path: 'persion-info', component: PersionInfoComponent },
    { path: 'common_view/:id', component: CommonViewComponent },
    { path: 'detail', component: DetailComponent },
    { path: 'edit', component: EditComponent },
    { path: 'feedback', component: FeedbackComponent },
    { path: 'work-diary', loadChildren: './view/work-diary/work-diary.module#WorkDiaryModule' },
    { path: 'work-dynamics', loadChildren: './view/work-dynamics/work-dynamics.module#WorkDynamicsModule' },
    { path: 'work-plan', loadChildren: './view/work-plan/work-plan.module#WorkPlanModule' },
    { path: 'receive-document', loadChildren: './view/receive-document/receive-document.module#ReceiveDocumentModule' },
    { path: 'send-document', loadChildren: './view/send-document/send-document.module#SendDocumentModule' },
    { path: 'document-handle', component: DocumentHandleComponent },
    { path: 'document-approve', component: DocumentApproveComponent },
    // { path: 'network-setting', component: NetworkSettingComponent },
    { path: 'network', loadChildren: './view/network/network.module#NetworkModule' },
    { path: 'bao-xiao', loadChildren: './view/bao-xiao/bao-xiao.module#BaoXiaoModule' },
    { path: 'assign', loadChildren: './view/assign/assign.module#AssignModule' },
    { path: 'leave', loadChildren: './view/leave/leave.module#LeaveModule' },
    { path: 'overtime-work', loadChildren: './view/overtime-work/overtime-work.module#OvertimeWorkModule' },
    { path: 'go-out', loadChildren: './view/go-out/go-out.module#GoOutModule' },
    { path: 'synthesize', loadChildren: './view/synthesize/synthesize.module#SynthesizeModule' },
    { path: 'property', loadChildren: './view/property/property.module#PropertyModule' },
    { path: 'notice', loadChildren: './view/notice/notice.module#NoticeModule' },
    { path: 'cultural-propaganda', loadChildren: './view/cultural-propaganda/cultural-propaganda.module#CulturalPropagandaModule' },
    { path: 'project-management', loadChildren: './view/project-management/project-management.module#ProjectManagementModule' },
    { path: 'full-map', loadChildren: './view/full-map/full-map.module#FullMapModule' },
    // { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
    {
        path: 'decision-making-platform',
        loadChildren: './view/decision-making-platform/decision-making-platform.module#DecisionMakingPlatformModule'
    },
    // 资产统计
    {path: 'asset-statistics', loadChildren: './view/asset-statistics/asset-statistics.module#AssetStatisticsModule'},
    // 融资还款
    {path: 'finance-reimbursement', loadChildren: './view/finance-reimbursement/finance-reimbursement.module#FinanceReimbursementModule'},
    // 资产明细
    {path: 'finance-detail', loadChildren: './view/finance-detail/finance-detail.module#FinanceDetailModule'},
  { path: 'read-list', loadChildren: './view/read-list/read-list.module#ReadListPageModule' },
    // 档案管理
    { path: 'archive-management/:id', loadChildren: './view/archive-management/archive-management.module#ArchiveManagementModule'
    },
    {path: 'project-detail', loadChildren: './view/project-detail/project-detail.module#ProjectDetailModule'},
    {path: 'dai-ban', loadChildren: './view/dai-ban/dai-ban.module#DaiBanModule'},
    {path: 'dai-yue', loadChildren: './view/dai-yue/dai-yue.module#DaiYueModule'},
    // 资产模块
    {path: 'zi-chan', loadChildren: './zi-chan/zi-chan.module#ZiChanModule'},
    {path: 'rong-zi', loadChildren: './rong-zi/rong-zi.module#RongZiModule'},

    // 项目模块
    {path: 'project', loadChildren: './project/project.module#ProjectModule'}

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
