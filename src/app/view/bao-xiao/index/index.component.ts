import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
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
        private events: Events,
        public route?: ActivatedRoute,
    ) {
        super(http, router, navController, dialogService);
        // this.url = this.query('url');
        // this.slides.startAutoplay();
        //

    }
    ngOnInit() {
        this.getDocumentList();
        this.getShenPiList();
        this.events.subscribe(AppConfig.Synthesize.List, () => {
            this.getDocumentList();
        });
        this.events.subscribe(AppConfig.Synthesize.ShenPiList, () => {
            this.getShenPiList();
        });
    }
    ngOnDestroy(): void {
        this.events.unsubscribe(AppConfig.Synthesize.List);
        this.events.unsubscribe(AppConfig.Synthesize.ShenPiList);
    }
    async change() {
        const index = await this.slides.getActiveIndex();
        this.index = index;
        this.getRequest();
    }
    segmentChange(index) {
        this.index = index;
        this.slides.slideTo(index);
    }
    getRequest() {
        if (this.index == 0) {
            this.getDocumentList();
        } else if (this.index == 1) {
            this.getShenPiList();
        } else if ( this.index == 2) {
            this.getMyShenPiList();
        } else if ( this.index === 3 ) {
            this.getLiuChengJianKongList();
        }
    }
    // @ts-ignore
    async getDocumentList() {
        const res = await  this.request('/baoXiao/zhsp_list', {});
        this.itemList = res.data;
    }
    // @ts-ignore
    async getShenPiList() {
        const res = await this.request('/baoXiao/shenpi_list', {});
        this.shenPiList = res.data;
    }
     // @ts-ignore
    async getMyShenPiList() {
        const res = await this.request('/baoXiao/mylist', {});
        this.myShenPiList = res.data;
     }
    // @ts-ignore
    async getLiuChengJianKongList() {
        const res = await this.request('/qingjia/liuChengJianKong', {type: 5});
        this.LiuChengJianKongList = res.data;
    }
    doRefresh(event) {
        super.doRefresh(event);
        this.getRequest();
    }
}
