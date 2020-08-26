import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import {Events, IonSlides} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import {AppConfig} from '../../../app.config';
import {JPushModel} from "../../home/jPush.model";

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
        public jPushModel: JPushModel,
        public route?: ActivatedRoute,
    ) {
        super(http, router, navController, dialogService);

    }
    ngOnInit() {
        this.getDocumentList();
        this.events.subscribe(AppConfig.Synthesize.List, () => {
            this.getDocumentList();
        });
        this.events.subscribe(AppConfig.Synthesize.ShenPiList, () => {
        });
    }
    ngOnDestroy(): void {
        this.events.unsubscribe(AppConfig.Synthesize.List);
        this.events.unsubscribe(AppConfig.Synthesize.ShenPiList);
    }
    change() {
    }
    doDaiBan(item) {
        const id = item.id;
        const type = item.activityname;
        const itemTitle = item.title;
        const contentTitle = '';
        this.jPushModel.goToPage(id,type,contentTitle,itemTitle);
    }
    getDocumentList() {
        this.request('/home/ToReadlist', {}).then((res) => {
            this.itemList = res.data;
        });
    }
    doRefresh(event) {
        super.doRefresh(event);
    }
}
