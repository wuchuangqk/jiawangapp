import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AppMinimize} from '@ionic-native/app-minimize/ngx';
import {Device} from '@ionic-native/device/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpService} from './service/http.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {CommonViewComponent} from './view/common-view/common-view.component';
import {DetailComponent} from './view/receive-document/detail/detail.component';
import {DocumentHandleComponent} from './view/receive-document/document-handle/document-handle.component';
import {CommonComponentsModule} from './common-components/common-components.module';
import {DocumentApproveComponent} from './view/receive-document/document-approve/document-approve.component';
import {JPush} from '@jiguang-ionic/jpush/ngx';
import {AppVersion} from '@ionic-native/app-version/ngx';


import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {FileTransfer} from '@ionic-native/file-transfer/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {NativeService} from './service/NativeService';


import {File} from '@ionic-native/file/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {Camera} from '@ionic-native/camera/ngx';
import {ImagePicker} from '@ionic-native/image-picker/ngx';
import {ImgUploadProvider} from './service/img-upload';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {Base64} from '@ionic-native/base64/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';
import {FeedbackComponent} from './view/feedback/feedback.component';
import {Badge} from '@ionic-native/badge/ngx';
import 'hammerjs';
import {QuillModule} from 'ngx-quill';
import {EditComponent} from './view/edit/edit.component';
import {AutoresizeTextareaDirective} from './autoresize-textarea.directive';
import {IndexedDBService} from './service/IndexedDBService';
import {ComponentsModule} from './components/components.module';
import {PdfViewerPageComponent} from './pdf-viewer-page/pdf-viewer-page.component';
// import { PdfViewerModule } from 'ng2-pdf-viewer';
import {SimplePdfViewerModule} from 'simple-pdf-viewer';
import {LogService} from './service/LogService';
import {PersionInfoComponent} from './view/persion-info/persion-info.component';
// import {DocumentViewer} from "@ionic-native/document-viewer";
import {SignaturePadModule} from 'angular2-signaturepad';
import {NgZorroAntdMobileModule} from 'ng-zorro-antd-mobile';


@NgModule({
    declarations: [
        AppComponent,
        CommonViewComponent,
        DetailComponent,
        DocumentHandleComponent,
        DocumentApproveComponent,
        EditComponent,
        FeedbackComponent,
        // NetworkSettingComponent,
        PersionInfoComponent,
        PdfViewerPageComponent,
        AutoresizeTextareaDirective,
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        HttpClientModule,
        ComponentsModule,
        CommonComponentsModule,
        NgZorroAntdMobileModule.forRoot(),
        SignaturePadModule,
        // PdfViewerModule,
        SimplePdfViewerModule,
        QuillModule.forRoot(
            {
                modules: {
                    // syntax: true,
                    toolbar: [
                        // ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                        // [{ header: 1 }, { header: 2 }],
                        // ['blockquote', 'code-block'],
                    ]
                }
            }
        ),
        IonicModule.forRoot(
            {
                backButtonText: '',
                mode: 'ios',
            }
        ), AppRoutingModule, FormsModule,

        ],
    providers: [
        HttpService,
        StatusBar,
        SplashScreen,
        AppMinimize,
        Device,
        AppVersion,
        File,
        AndroidPermissions,
        NativeService,
        NativeStorage,
        Camera,
        ImagePicker,
        JPush,
        FileTransfer,
        FileOpener,
        ImgUploadProvider,
        LogService,
        FileChooser,
        Base64,
        FilePath,
        Badge,
        IndexedDBService,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        // { provide: HashLocationStrategy, useClass: LocationStrategy }
        // {provide: LocationStrategy, useClass: HashLocationStrategy},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
