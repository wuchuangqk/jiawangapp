import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import { DateProvider } from '../../../service/Date';
import {Events, IonSlides} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import {AppConfig} from '../../../app.config';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {elementStart} from '@angular/core/src/render3';

@Component({
    selector: 'index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
})
export class IndexComponent extends BasePage implements OnInit, OnDestroy {
    @ViewChild(IonSlides) slides: IonSlides;
    itemList = [];
    shenPiList = [];
    myShenPiList = [];
    LiuChengJianKongList = [];
    public menuList = [
        { title: '我申请的' },
        { title: '待我审批的' },
        { title: '我已审批的' },
        { title: '流程监控' },
    ];
    public index = 0;
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
        this.getDocumentList();
        this.getShenPiList();
        this.events.subscribe(AppConfig.Leave.List, () => {
            this.getDocumentList();
        });
        this.events.subscribe(AppConfig.Leave.ShenPiList, () => {
            this.getShenPiList();
        });
    }
    ngOnDestroy(): void {
        this.events.unsubscribe(AppConfig.Leave.List);
        this.events.unsubscribe(AppConfig.Leave.ShenPiList);
    }

    change() {
        this.slides.getActiveIndex().then((index) => {
            this.index = index;
            this.getRequest();
        });
    }
    segmentChange(index) {
        this.index = index;
        this.slides.slideTo(index);
    }
    getRequest() {
        if (this.index === 0) {
            this.getDocumentList();
        } else if (this.index === 1) {
            this.getShenPiList();
        } else if (this.index === 2) {
            this.getMyShenPiList();
        } else if (this.index === 3) {
            this.getLiuChengJianKongList();
        }
    }

    getDocumentList() {
        this.request('/qingjia/qingjialist', {
            document_type: 0
        }).then((res) => {
            this.itemList = res.data;
        });
    }
    getShenPiList() {
        this.request('/qingjia/shenpi_list', {}).then((res) => {
            this.shenPiList = res.data;
        });
    }

    getMyShenPiList() {
        this.request('/qingjia/mylist', {}).then((res) => {
            this.myShenPiList = res.data;
        });
    }

    getLiuChengJianKongList() {
        this.request('/qingjia/liuChengJianKong', {type: 1}).then((res) => {
            this.LiuChengJianKongList = res.data;
        });
    }
    doRefresh(event) {
        super.doRefresh(event);
        this.getRequest();
    }
}
