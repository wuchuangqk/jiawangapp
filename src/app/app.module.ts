import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpService } from './service/http.service';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NoticeComponent} from './view/notice/notice.component';
import {CommonViewComponent} from './view/common-view/common-view.component';
import {DetailComponent} from './view/detail/detail.component';
import {DocumentHandleComponent} from './view/document-handle/document-handle.component';
import {CommonComponentsModule} from './common-components/common-components.module';

@NgModule({

    declarations: [
        AppComponent,
        NoticeComponent,
        CommonViewComponent,
        DetailComponent,
        DocumentHandleComponent,
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        HttpClientModule,
        CommonComponentsModule,
        IonicModule.forRoot(
            {
                backButtonText: 'aa',
                mode: 'ios',
            }
        ), AppRoutingModule, FormsModule],
    providers: [
        HttpService,
        StatusBar,
        SplashScreen,
        AppMinimize,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        // { provide: HashLocationStrategy, useClass: LocationStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
