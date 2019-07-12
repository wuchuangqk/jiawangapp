import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import {Events, IonSlides, NavController} from '@ionic/angular';
import {AppConfig} from '../../../app.config';

@Component({
    selector: 'index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
})
export class IndexComponent extends BasePage implements OnInit, OnDestroy {
    @ViewChild(IonSlides) slides: IonSlides;
    public menuList = [
        { name: '待办事项', index: 0 },
        { name: '已办事项', index: 1 }
    ];
    public index = 0;
    public payload = {
        url: '/letter/list',
    };
    public backlogList = [];
    public doneList = [];
    constructor(
        public http: HttpService,
        public router: Router,
        public dialogService: DialogService,
        public events: Events,
        public navController: NavController,
        public route?: ActivatedRoute,
    ) {
        super(http, router, navController, dialogService);
    }
    ngOnInit() {
        this.getBacklogList();
        this.getDoneList();
        this.events.subscribe(AppConfig.Assign.DoneList, () => {
            this.getDoneList();
        });
        this.events.subscribe(AppConfig.Assign.List, () => {
            this.getBacklogList();
        });
    }
    ngOnDestroy(): void {
        this.events.unsubscribe(AppConfig.Assign.DoneList);
        this.events.unsubscribe(AppConfig.Assign.List);
    }

    ngModelChange(index: number): void {
        this.index = index;
        this.slides.slideTo(index);
    }
    change() {
        this.slides.getActiveIndex().then((index) => {
            this.index = index;
            this.getRequest();
        });
    }
    getBacklogList() {
        this.request(this.payload.url, this.payload).then((res) => {
            this.backlogList = res.data;
        });
    }
    getDoneList() {
        this.request('/letter/listed', {}).then((res) => {
            this.doneList = res.data;
        });
    }
    getRequest() {
        if (this.index == 0) {
            this.getBacklogList();
        } else if (this.index == 1) {
            this.getDoneList();
        }
    }
    doRefresh(event) {
        super.doRefresh(event);
        this.getRequest();
    }

}
