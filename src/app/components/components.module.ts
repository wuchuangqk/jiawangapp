import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsComponent } from './lists/lists.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import {BaseInfoComponent} from './base-info/base-info.component';



@NgModule({
  declarations: [
    ListsComponent,
    BaseInfoComponent,
  ],
  exports: [
    ListsComponent,
    BaseInfoComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
