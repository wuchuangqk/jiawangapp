import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../service/dialog.service';
import {DetailBasePage} from '../../base/detail-base-page';
import {DomSanitizer} from '@angular/platform-browser';
import { NavController } from '@ionic/angular';
import { Events } from '@ionic/angular';
import {AppConfig} from '../../app.config';

@Component({
    selector: 'app-common-view',
    templateUrl: './common-view.component.html',
    styleUrls: ['./common-view.component.scss'],
})
export class CommonViewComponent extends DetailBasePage implements OnInit, OnDestroy {
    public contentTitle = '';
    public content = '';
    constructor(
        public http: HttpService,
        public router: Router,
        public navController: NavController,
        public dialogService: DialogService,
        public sanitizer: DomSanitizer,
        public events: Events,
        public route?: ActivatedRoute,
    ) {
        super(http, router, dialogService, sanitizer , navController);
        this.title = this.query('title');
        this.url = this.query('url');
        this.id = this.query('id');
        this.contentTitle = this.query('contentTitle');
    }

    ngOnInit() {
        this.getDetail({}).then(() => {
            this.events.publish(AppConfig.Notice.List);
            this.events.publish(AppConfig.Home.Badge);
        });
    }
    ngOnDestroy() {
    }

}
