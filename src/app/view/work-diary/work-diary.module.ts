import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkDiaryRoutingModule } from './work-diary-routing.module';
import {WorkDiaryPage} from './index/work-diary.page';
import {AddComponent} from './add/add.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {CommonComponentsModule} from '../../common-components/common-components.module';
import {ViewStaffWorkDiaryComponent} from './view-staff-work-diary/view-staff-work-diary.component';
import {StaffWorkDiaryComponent} from './staff-work-diary/staff-work-diary.component';

@NgModule({
    declarations: [
        WorkDiaryPage,
        ViewStaffWorkDiaryComponent,
        StaffWorkDiaryComponent, // 进入到其他人的工作日志里面
        AddComponent,
    ],
    imports: [
        CommonComponentsModule,
        CommonModule,
        IonicModule,
        WorkDiaryRoutingModule,
        FormsModule
    ]
})
export class WorkDiaryModule {
}
