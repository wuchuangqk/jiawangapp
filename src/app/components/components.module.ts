import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsComponent } from './lists/lists.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import {BaseInfoComponent} from './base-info/base-info.component';
import {CommonComponentsModule} from '../common-components/common-components.module';
import {JinDuJiHuaComponent} from './jin-du-ji-hua/jin-du-ji-hua.component';
import {GongChengZhaoBiaoComponent} from './gong-cheng-zhao-biao/gong-cheng-zhao-biao.component';


@NgModule({
  declarations: [
    ListsComponent,
    BaseInfoComponent,
    JinDuJiHuaComponent,
    GongChengZhaoBiaoComponent,
  ],
  exports: [
    ListsComponent,
    BaseInfoComponent,
    JinDuJiHuaComponent,
    GongChengZhaoBiaoComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    CommonComponentsModule
  ]
})
export class ComponentsModule { }
