import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReadListPage } from './read-list.page';
import {CommonComponentsModule} from '../../common-components/common-components.module';

const routes: Routes = [
  {
    path: '',
    component: ReadListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReadListPage, ]
})
export class ReadListPageModule {}
