import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {IndexComponent} from './index/index.component';
import {AddComponent} from './add/add.component';
import {FormsModule} from '@angular/forms';
import {CommonComponentsModule} from '../../common-components/common-components.module';
import {IonicModule} from '@ionic/angular';
import {ExchangeAddComponent} from './exchange-add/exchange-add.component';
import {ExchangeViewComponent} from './exchange-view/common-view.component';
import {CommentListComponent} from './comment-list/comment-list.component';
import {AddCommentComponent} from './add-comment/add-comment.component';
import {WorkDynamicsRoutingModule} from './work-dynamics-routing.module';

@NgModule({
  declarations: [
      IndexComponent,
      AddComponent,
      AddCommentComponent,
      CommentListComponent,
      ExchangeAddComponent,
      ExchangeViewComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CommonComponentsModule,
      WorkDynamicsRoutingModule,
  ]
})
export class WorkDynamicsModule { }
