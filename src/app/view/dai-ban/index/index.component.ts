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
export class IndexComponent extends BasePage implements OnInit {
    public userId=0;
    @ViewChild(IonSlides) slides: IonSlides;
    itemList = [];
    shenPiList = [];
    erCiLaiWenList = [];
    public menuList = [
        { title: '待办事项' },
        { title: '二次来文' },
    ];
    public index = 0;
    constructor(
        public http: HttpService,
        public router: Router,
        public navController: NavController,
        public dialogService: DialogService,
        public jPushModel: JPushModel,
        private events: Events,
        public route?: ActivatedRoute,
    ) {
        super(http, router, navController, dialogService);

    }
    async ngOnInit() {
        console.log(this.userId)
        this.userId = this.getUserId();
        this.getDocumentList();
        this.getErCiLaiWen()
        await this.getErCiLaiWen();
        this.events.subscribe(AppConfig.Home.Badge, () => {
            this.getDocumentList();
            this.getErCiLaiWen()
        });
    }
    change() {
        this.slides.getActiveIndex().then((index) => {
            this.index = index;
            this.getDocumentList();
            this.getErCiLaiWen()
        });
    }

    segmentChange(index) {
        this.index = index;
        this.slides.slideTo(index);
    }
    doDaiBan(item) {
        const id = item.id;
        const type = item.activityname;
        const itemTitle = '';
        const contentTitle = '';
        this.jPushModel.goToPage(id,type,contentTitle,itemTitle);

    }
    // home/TodoBosslist
    async getErCiLaiWen(){
         let res = await this.request("/home/TodoBosslist",{             nums:2})
         this.erCiLaiWenList = res.data;
        console.log(res);
    }
    getDocumentList() {
        this.request('/home/Todolist', {}).then((res) => {
            this.itemList = res.data;
        });
    }
    doRefresh(event) {
        super.doRefresh(event);
    }
}
