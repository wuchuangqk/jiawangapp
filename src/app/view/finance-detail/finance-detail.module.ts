import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IndexComponent} from './index/index.component';
import {AddComponent} from './add/add.component';
import { FinanceDetailRoutingModule } from './finance-detail-routing.module';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {CommonComponentsModule} from '../../common-components/common-components.module';
import {DetailComponent} from './detail/detail.component';

@NgModule({
  declarations: [
      IndexComponent,
      AddComponent,
      DetailComponent,
  ],
  imports: [
    CommonModule,
      IonicModule,
      FormsModule,
      CommonComponentsModule,
    FinanceDetailRoutingModule
  ]
})
export class FinanceDetailModule {}
