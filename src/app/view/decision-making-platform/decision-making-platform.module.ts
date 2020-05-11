import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecisionMakingPlatformRoutingModule } from './decision-making-platform-routing.module';
import { IndexComponent } from './index/index.component';
import {IonicModule} from '@ionic/angular';
import {CommonComponentsModule} from '../../common-components/common-components.module';
import {FormsModule} from '@angular/forms';
import {HuiZongTongJiComponent} from './hui-zong-tong-ji/hui-zong-tong-ji.component';
import {DongTaiZiJinComponent} from './dong-tai-zi-jin/dong-tai-zi-jin.component';
import {CaiWuZhiFuComponent} from './cai-wu-zhi-fu/cai-wu-zhi-fu.component';
import {DongTaiZiJinDetailComponent} from './dong-tai-zi-jin-detail/dong-tai-zi-jin-detail.component';

@NgModule({
  declarations: [
    IndexComponent,
      HuiZongTongJiComponent,
      DongTaiZiJinComponent,
      CaiWuZhiFuComponent,
      DongTaiZiJinDetailComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CommonComponentsModule,
    DecisionMakingPlatformRoutingModule
  ]
})
export class DecisionMakingPlatformModule { }
