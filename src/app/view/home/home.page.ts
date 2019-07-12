import { Component } from '@angular/core';
import { HttpService } from '../../service/http.service';
import {BasePage} from '../../base/base-page';
import { HomeModel } from './home.page.model';
import {DialogService} from '../../service/dialog.service';
import {Router} from '@angular/router';
import {Events, NavController} from '@ionic/angular';
import {AppConfig} from '../../app.config';


interface IConfig {
    url: string;
    data: object;
}
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage extends BasePage {
    public itemList: any = HomeModel.itemList;
    public title = '首页';
    constructor(
        public http: HttpService,
        public router: Router,
        public dialogService: DialogService,
        public navController: NavController,
        public events: Events,
    ) {
        super( http, router, navController, dialogService);
    }
    ngOnInit() {
        super.ngOnInit();
        this.getHomeConfigData();
        this.events.subscribe(AppConfig.Home.Badge, () => {
            this.getHomeConfigData();
        });
    }

    getHomeConfigData() {
        this.request('/users/home_configure', {}).then((res) => {
            this.itemList[0].bage = Number(res.data.tzgg);
            this.itemList[2].bage = Number(res.data.sw);
            this.itemList[3].bage = Number(res.data.fw);
            this.itemList[4].bage = Number(res.data.gzdt);
        }).catch((err) => {
            console.log(err);
        });
    }
    doRefresh(event) {
        super.doRefresh(event);
        this.getHomeConfigData();
    }


}
