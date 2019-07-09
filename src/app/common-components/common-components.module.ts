import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BackComponent} from './back/back.component';
import {IonicModule} from '@ionic/angular';
import {StaffComponent} from './staff/staff.component';
import {CircleTextComponent} from './circle-text/circle-text.component';

@NgModule({
    declarations: [
        BackComponent,
        StaffComponent,
        CircleTextComponent,
    ],
    imports: [
        IonicModule,
        CommonModule
    ],
    exports: [
        BackComponent,
        StaffComponent,
        CircleTextComponent,
    ]
})
export class CommonComponentsModule { }
