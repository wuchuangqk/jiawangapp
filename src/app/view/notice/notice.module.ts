import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticeRoutingModule } from './notice-routing.module';
import {IndexComponent} from './index/index.component';
import {AddComponent} from './add/add.component';
import {FormsModule} from '@angular/forms';
import {CommonComponentsModule} from '../../common-components/common-components.module';
import {IonicModule} from '@ionic/angular';
import {ExchangeAddComponent} from './exchange-add/exchange-add.component';
import {ExchangeViewComponent} from './exchange-view/common-view.component';
import {CommentListComponent} from './comment-list/comment-list.component';
import {AddCommentComponent} from './add-comment/add-comment.component';

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
    NoticeRoutingModule,
  ]
})
export class NoticeModule { }
