import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceReimbursementRoutingModule } from './finance-reimbursement-routing.module';
import {IndexComponent} from './index/index.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {CommonComponentsModule} from '../../common-components/common-components.module';

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CommonComponentsModule,
    FinanceReimbursementRoutingModule
  ]
})
export class FinanceReimbursementModule { }
