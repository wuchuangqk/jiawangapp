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
    myShenPiList = [];
    LiuChengJianKongList = [];
    isHasMonitor: boolean = false;
    isHasShenQing
    keyword = '';
    public menuList = [
        // { title: '我申请的' },
        { title: '待我审批的' },
        { title: '我已审批的' },
        // { title: '流程监控' },
    ];
    public index = 0;
    isGetPermission = false
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
        this.request('/waichu/isMonitor', {}).then((res) => {
            if(res.data) {
                this.isHasMonitor = true;
                this.menuList.push({
                    title: '流程监控'
                });
            }
        });
        this.request('/home/homeaccess', {}).then((res) => {
            this.isHasShenQing = res.data['外出申请']
            if (this.isHasShenQing) {
                this.menuList.unshift({ title: '我申请的' })
            }
            this.isGetPermission = true
        })
        this.getDocumentList();
        this.getShenPiList();
        this.events.subscribe(AppConfig.GoOut.List,()=>{
            this.getDocumentList();
        });
        this.events.subscribe(AppConfig.GoOut.ShenPiList,()=>{
            this.getShenPiList();
        });
    }
    ngOnDestroy(): void {
        this.events.unsubscribe(AppConfig.GoOut.List);
        this.events.unsubscribe(AppConfig.GoOut.ShenPiList);
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
        this.request('/waichu/waichu_list', {}).then((res) => {
            this.itemList = res.data;
        });
    }
    getShenPiList() {
        this.request('/waichu/shenpi_list', {}).then((res) => {
            this.shenPiList = res.data;
        });
    }
    getMyShenPiList() {
        this.request('/waichu/mylist', {}).then((res) => {
            this.myShenPiList = res.data;
        });
    }
    getLiuChengJianKongList() {
        this.request('/waichu/monitorlist', {keyword: this.keyword}).then((res) => {
            this.LiuChengJianKongList = res.data;
        });
    }
    getRequest() {
        if (this.isHasShenQing) {
            if (this.index == 0) {
                this.getDocumentList();
            } else if (this.index == 1) {
                this.getShenPiList();
            } else if (this.index == 2){
                this.getMyShenPiList();
            } else if (this.index === 3){
                this.getLiuChengJianKongList();
            }
        } else {
            if (this.index == 0) {
                this.getShenPiList();
            } else if (this.index == 1) {
                this.getMyShenPiList();
            } else if (this.index == 2){
                this.getLiuChengJianKongList();
            }
        }
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
