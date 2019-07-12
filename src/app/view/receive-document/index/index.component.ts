import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import { DateProvider } from '../../../service/Date';
import {Events, IonSlides} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import {AppConfig} from '../../../app.config';

@Component({
    selector: 'index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
})
export class IndexComponent extends BasePage implements OnInit, OnDestroy {
    @ViewChild(IonSlides) slides: IonSlides;
    itemList = [];
    shenPiList = [];
    public menuList = [
        { title: '收文系统' },
        { title: '收文审核' }
    ];
    public index = 0;
    constructor(
        public http: HttpService,
        public router: Router,
        public navController: NavController,
        public dialogService: DialogService,
        private dateProvider: DateProvider,
        private events: Events,
        public route?: ActivatedRoute,
    ) {
        super(http, router, navController, dialogService);
        // this.url = this.query('url');
        // this.slides.startAutoplay();

    }
    ngOnInit() {
        this.events.subscribe((AppConfig.Document.DocumentList), () => {
            this.getDocumentList();
        });
        this.events.subscribe((AppConfig.Document.DocumentShenPiList), () => {
            this.getShenPiList();
        });
        this.getDocumentList();
        this.getShenPiList();
    }
    ngOnDestroy(): void {
        this.events.unsubscribe((AppConfig.Document.DocumentList));
        this.events.unsubscribe((AppConfig.Document.DocumentShenPiList));
    }
    change() {
        this.slides.getActiveIndex().then((index) => {
            this.index = index;
            this.getRequst();
        });
    }
    segmentChange(index) {
        this.index = index;
        this.slides.slideTo(index);
    }

    getDocumentList() {
        this.request('/documents/slist', {
            document_type: 0
        }).then((res) => {
            this.itemList = res.data;
        });
    }
    getShenPiList() {
        this.request('/documents/sshlist', {}).then((res) => {
            this.shenPiList = res.data;
        });
    }
    getRequst(){
        if (this.index == 0) {
            this.getDocumentList();
        } else if (this.index == 1) {
            this.getShenPiList();
        }
    }
    doRefresh(event) {
        super.doRefresh(event);
        this.getRequst();
    }
}
