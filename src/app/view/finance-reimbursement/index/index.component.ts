import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import {Events, NavController} from '@ionic/angular';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent extends BasePage implements OnInit {
    public dataList = [];
    constructor(
        public http: HttpService,
        public router: Router,
        public dialogService: DialogService,
        public navController: NavController,
        public events: Events,
        public route?: ActivatedRoute,
    ) {
        super(http, router, navController, dialogService, route);
    }
    ngOnInit(): void {
        this.request('/rongzi/warmlist', {
        }).then((res) => {
            this.dataList = res.data;
        })
        ;
    }
}
