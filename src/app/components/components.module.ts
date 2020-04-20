import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsComponent } from './lists/lists.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import {BaseInfoComponent} from './base-info/base-info.component';
import {CommonComponentsModule} from '../common-components/common-components.module';
import {JinDuJiHuaComponent} from './jin-du-ji-hua/jin-du-ji-hua.component';
import {GongChengZhaoBiaoComponent} from './gong-cheng-zhao-biao/gong-cheng-zhao-biao.component';
import {GongChengHeTongComponent} from './gong-cheng-he-tong/gong-cheng-he-tong.component';
import {GongChengBianGengComponent} from './gong-cheng-bian-geng/gong-cheng-bian-geng.component';
import {JinDuYueBaoComponent} from './jin-du-yue-bao/jin-du-yue-bao.component';
import {ZhiLiangAnQuanComponent} from './zhi-liang-an-quan/zhi-liang-an-quan.component';
import {JunGongYanShouComponent} from './jun-gong-yan-shou/jun-gong-yan-shou.component';
import {GongChengZiLiaoComponent} from './gong-cheng-zi-liao/gong-cheng-zi-liao.component';


@NgModule({
  declarations: [
    ListsComponent,
    BaseInfoComponent,
    JinDuJiHuaComponent,
    GongChengZhaoBiaoComponent,
    GongChengHeTongComponent,
    GongChengBianGengComponent,
    JinDuYueBaoComponent,
    ZhiLiangAnQuanComponent,
    JunGongYanShouComponent,
    GongChengZiLiaoComponent,
  ],
  exports: [
    ListsComponent,
    BaseInfoComponent,
    JinDuJiHuaComponent,
    GongChengZhaoBiaoComponent,
    GongChengHeTongComponent,
    GongChengBianGengComponent,
    JinDuYueBaoComponent,
    ZhiLiangAnQuanComponent,
    JunGongYanShouComponent,
    GongChengZiLiaoComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    CommonComponentsModule
  ]
})
export class ComponentsModule { }
