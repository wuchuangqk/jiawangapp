import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeTongShenChaRoutingModule } from './he-tong-shen-cha-routing.module';
import {IndexComponent} from "./index/index.component";
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {CommonComponentsModule} from "../../common-components/common-components.module";
import {DetailComponent} from "./detail/detail.component";

@NgModule({
  declarations: [
      IndexComponent,
      DetailComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CommonComponentsModule,
    HeTongShenChaRoutingModule
  ]
})
export class HeTongShenChaModule { }
