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
        public jPushModel: JPushModel,
        private events: Events,
        public route?: ActivatedRoute,
    ) {
        super(http, router, navController, dialogService);

    }
    ngOnInit() {
        this.getDocumentList();
        this.events.subscribe(AppConfig.Home.Badge, () => {
            this.getDocumentList();
        });
    }
    change() {
    }
    doDaiBan(item) {
        const id = item.id;
        const type = item.activityname;
        const itemTitle = '';
        const contentTitle = '';
        this.jPushModel.goToPage(id,type,contentTitle,itemTitle);

    }
    getDocumentList() {
        this.request('/home/Todolist', {}).then((res) => {
            this.itemList = res.data;
            console.log(this.itemList);
            let r =  this.itemList.sort((a:any,b:any)=>{
                // @ts-ignore
                let s= new Date(a.time)-new Date(b.time);
                console.log(s);
                return s;
            })
            this.itemList.reverse()
            console.log(this.itemList);
            console.log(r);
        });
    }
    doRefresh(event) {
        super.doRefresh(event);
    }
}
