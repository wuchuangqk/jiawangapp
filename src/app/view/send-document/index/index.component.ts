import {Component, OnDestroy, OnInit} from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import {Events, NavController} from '@ionic/angular';
import {App} from '@ionic/pro';
import {AppConfig} from '../../../app.config';



@Component({
    selector: 'index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
})
export class IndexComponent extends BasePage implements OnInit,OnDestroy {
    itemList = [];
    constructor(
        public http: HttpService,
        public router: Router,
        public navController: NavController,
        public dialogService: DialogService,
        public events: Events,
        public route?: ActivatedRoute,
    ) {
        super(http, router, navController, dialogService);
        // this.url = this.query('url');
        // this.slides.startAutoplay();

    }
    ngOnInit() {
        this.events.subscribe(AppConfig.Document.DocumentList, () => {
            this.getDocumentList();
        });
        this.getDocumentList();
    }
    ngOnDestroy(): void {
        this.events.unsubscribe(AppConfig.Document.DocumentList);
    }

    getDocumentList() {
        this.request('/documents/flist', {
            document_type: 1
        }).then((res) => {
            this.itemList = res.data;
        });
    }
}
