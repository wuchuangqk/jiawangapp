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
        { title: '外出管理' },
        { title: '待我审批' }
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
    getRequest() {
        if (this.index == 0) {
            this.getDocumentList();
        } else if (this.index == 1) {
            this.getShenPiList();
        }
    }
    doRefresh(event) {
        super.doRefresh(event);
        this.getRequest();
    }
}
