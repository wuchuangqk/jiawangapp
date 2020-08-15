import { OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpService } from '../service/http.service';
import { DialogService } from '../service/dialog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BasePage} from './base-page';

export class ListBasePage extends BasePage {
    public url: string;
    public listData: any[] = [];
    public pageindex = 1;
    public payload: any = {};
    public hasnext = 1;
    constructor(
        public http: HttpService,
        public router: Router,
        public dialogService: DialogService,
        public navController: NavController,
        public route?: ActivatedRoute,
    ) {
        super(http, router, navController, dialogService);
    }
    public async getListData() {
        this.payload.pageindex = this.pageindex;
        const res = (await this.request(this.url, this.payload));
        this.listData = this.listData.concat(res.data);
        this.hasnext = res.hasnext;
    }
    doRefresh(event) {
        super.doRefresh(event);
        this.getListData();
    }
    async loadData(event) {
        this.pageindex++;
        if (this.hasnext) {
          await this.getListData();
        } else {
            await this.dialogService.toast('已加载所有数据！');
        }
        event.target.complete();
    }
}
