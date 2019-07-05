import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BackComponent} from './back/back.component';
import {IonicModule} from '@ionic/angular';

@NgModule({
    declarations: [
        BackComponent,
    ],
    imports: [
        IonicModule,
        CommonModule
    ],
    exports: [
        BackComponent
    ]
})
export class CommonComponentsModule { }
