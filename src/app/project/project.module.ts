import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import {MyProjectComponent} from './my-project/my-project.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {CommonComponentsModule} from '../common-components/common-components.module';
import {XiangMuJinDuComponent} from './xiang-mu-jin-du/xiang-mu-jin-du.component';
import {MyShenPiListComponent} from './my-shen-pi-list/my-shen-pi-list.component';
import {ApproveComponent} from './approve/approve.component';

@NgModule({
  declarations: [
    MyProjectComponent,
    XiangMuJinDuComponent,
    MyShenPiListComponent,
    ApproveComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CommonComponentsModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule { }
