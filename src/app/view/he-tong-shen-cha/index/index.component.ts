import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import { DateProvider } from '../../../service/Date';
import {Events, IonSlides} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import {AppConfig} from '../../../app.config';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
    selector: 'index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
})
export class IndexComponent extends BasePage implements OnInit, OnDestroy {
    @ViewChild(IonSlides) slides: IonSlides;
    // 我的审查
    woDeShenChaList = [];
    // 待办审查
    daiBanShenChaList = [];
    // 已办审查
    yiBanShenChaList = [];
    LiuChengJianKongList = [];

    public menuList = [
        { title: '我的审查' },
        { title: '待办审查' },
        { title: '已办审查' },
    ];
    public index = 0;
    constructor(
        public http: HttpService,
        public router: Router,
        public sanitizer: DomSanitizer,
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
        this.getWoDeShenChaList();
        this.getDaiBanList();
        this.events.subscribe(AppConfig.HeTongShenCha.List,()=>{
            this.getWoDeShenChaList();
            this.getDaiBanList();
        });
    }
    ngOnDestroy(): void {
        this.events.unsubscribe(AppConfig.HeTongShenCha.List);
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

    // 我的审查
    getWoDeShenChaList() {
        this.request('/examine/mylist', {}).then((res) => {
            this.woDeShenChaList = res.data;
        });
    }
    // 待办审查
    getDaiBanList() {
        this.request('/examine/todo', {}).then((res) => {
            this.daiBanShenChaList = res.data;
        });
    }
    // 已办审查
    getYiBanShenChaList(){
        this.request('/examine/hasdone', {}).then((res) => {
            this.yiBanShenChaList = res.data;
        });
    }
    getLiuChengJianKongList() {
        this.request('/qingjia/liuChengJianKong', {type: 3}).then((res) => {
            this.LiuChengJianKongList = res.data;
        });
    }
    getRequest() {
        if (this.index == 0) {
            this.getWoDeShenChaList();
        } else if (this.index == 1) {
            this.getDaiBanList();
        } else if (this.index == 2){
            this.getYiBanShenChaList();
        } else if (this.index === 3){
            this.getLiuChengJianKongList();
        }
    }

    public transform(content): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(content);
    }
    doRefresh(event) {
        super.doRefresh(event);
        this.getRequest();
    }
}
