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
export class IndexComponent extends BasePage implements OnInit , OnDestroy {
    @ViewChild(IonSlides) slides: IonSlides;
    itemList = [];
    shenPiList = [];
    myShenPiList = [];
    LiuChengJianKongList = [];
    isHasMonitor: boolean = false;
    keyword = '';
    public menuList = [
        { title: '我申请的' },
        { title: '待我审批的' },
        { title: '我已审批的' },
        // { title: '流程监控' },
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

    }
    ngOnInit() {
        // 查询是否有流程监控权限
        this.request('/jiaban/isMonitor', {}).then((res) => {
            if(res.data) {
                this.isHasMonitor = true;
                this.menuList.push({
                    title: '流程监控'
                });
            }
        });
        this.getDocumentList();
        this.getShenPiList();
        this.events.subscribe(AppConfig.OvertimeWork.List, () => {
            this.getDocumentList();
        });
        this.events.subscribe(AppConfig.OvertimeWork.ShenPiList, () => {
            this.getShenPiList();
        });
    }
    ngOnDestroy(): void {
        this.events.unsubscribe(AppConfig.OvertimeWork.List);
        this.events.unsubscribe(AppConfig.OvertimeWork.ShenPiList);
    }
    getRequest() {
        if (this.index === 0) {
            this.getDocumentList();
        } else if (this.index === 1) {
            this.getShenPiList();
        } else if( this.index === 2){
            this.getMyShenPiList();
        }else if(this.index === 3 ){
            this.getLiuChengJianKongList();
        }
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

    getDocumentList() {
        this.request('/jiaban/jiaban_list', {}).then((res) => {
            this.itemList = res.data;
        });
    }
    getShenPiList() {
        this.request('/jiaban/shenpi_list', {}).then((res) => {
            this.shenPiList = res.data;
        });
    }
     getMyShenPiList() {
        this.request('/jiaban/mylist', {}).then((res) => {
            this.myShenPiList = res.data;
        });
    }

    getLiuChengJianKongList() {
        this.request('/jiaban/monitorlist', {keyword: this.keyword}).then((res) => {
            this.LiuChengJianKongList = res.data;
        });
    }
    doRefresh(event) {
        super.doRefresh(event);
        this.getRequest();
    }

    /**
     * 流程监控根据申请人姓名查询
     * @param event
     */
    doSearch(event) {
        this.keyword = event.detail.value;
        this.getLiuChengJianKongList()
    }
}
