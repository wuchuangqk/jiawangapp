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
    }
    ngOnInit() {
        this.getDocumentList();
        this.events.subscribe(AppConfig.FinanceDetail.list, () => {
            this.getDocumentList();
        });
    }
    ngOnDestroy(): void {
        this.events.unsubscribe(AppConfig.FinanceDetail.list);
    }
    // @ts-ignore
    async  getDocumentList(): Promise<any> {
        const res = await this.request('/zhigou/zhichan_list', {});
        this.itemList = res.data;
        return this.itemList;
    }
    doRefresh(event) {
        super.doRefresh(event);
    }
}
