import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BackComponent} from './back/back.component';
import {IonicModule} from '@ionic/angular';
import {StaffComponent} from './staff/staff.component';
import {CircleTextComponent} from './circle-text/circle-text.component';
import {CulturalComponent} from './cultural/cultural.component';

@NgModule({
    declarations: [
        BackComponent,
        StaffComponent,
        CircleTextComponent,
        CulturalComponent,
    ],
    imports: [
        IonicModule,
        CommonModule
    ],
    exports: [
        BackComponent,
        StaffComponent,
        CircleTextComponent,
        CulturalComponent,
    ]
})
export class CommonComponentsModule { }
