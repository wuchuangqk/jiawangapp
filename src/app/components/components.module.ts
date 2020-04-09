import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsComponent } from './lists/lists.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import {BaseInfoComponent} from './base-info/base-info.component';
import {CommonComponentsModule} from '../common-components/common-components.module';



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
    PipesModule,
    CommonComponentsModule
  ]
})
export class ComponentsModule { }
