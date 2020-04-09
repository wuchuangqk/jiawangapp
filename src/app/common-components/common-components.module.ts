import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BackComponent} from './back/back.component';
import {IonicModule} from '@ionic/angular';
import {StaffComponent} from './staff/staff.component';
import {CircleTextComponent} from './circle-text/circle-text.component';
import {CulturalComponent} from './cultural/cultural.component';
import {FileViewerComponent} from './file-viewer/file-viewer.component';
import {RichTextEditorComponent} from './rich-text-editor/rich-text-editor.component';
import {ScrollXComponent} from './scroll-x/scroll-x';
import {ViewContentComponent} from './view-content/view-content.component';

@NgModule({
    declarations: [
        BackComponent,
        StaffComponent,
        CircleTextComponent,
        CulturalComponent,
        FileViewerComponent,
        RichTextEditorComponent,
        ScrollXComponent,
        ViewContentComponent,
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
        FileViewerComponent,
        RichTextEditorComponent,
        ScrollXComponent,
        ViewContentComponent,
    ]
})
export class CommonComponentsModule { }
