import { Component } from '@angular/core';
import { HttpService } from '../../service/http.service';
import {BasePage} from '../../base/base-page';
import { HomeModel } from './home.page.model';
import {DialogService} from '../../service/dialog.service';
import {Router} from '@angular/router';

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
    itemList = HomeModel.itemList;
    public title = '首页';
    constructor(
        public http: HttpService,
        public router: Router,
        public dialogService: DialogService,
    ) {
        super( http, router, dialogService);
    }

}
