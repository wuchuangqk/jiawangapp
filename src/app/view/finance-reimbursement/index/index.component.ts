import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import {Events, NavController} from '@ionic/angular';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent extends BasePage implements OnInit {
    public dataList = [];
    public params = {
        timebegin : '',
        timeend: ''
    };
    constructor(
        public http: HttpService,
        public router: Router,
        public dialogService: DialogService,
        public navController: NavController,
        public events: Events,
        public route?: ActivatedRoute,
    ) {
        super(http, router, navController, dialogService, route);
        const date = new Date();
        const date2 = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
        const datePipe = new DatePipe('en-US');
        this.params.timebegin = datePipe.transform(date, 'yyyy-MM-dd');
        this.params.timeend = datePipe.transform(date2, 'yyyy-MM-dd');
    }
    ngOnInit(): void {
        const datePipe = new DatePipe('en-US');
        this.params.timebegin = datePipe.transform(this.params.timebegin, 'yyyy-MM-dd');
        this.params.timeend = datePipe.transform(this.params.timeend, 'yyyy-MM-dd');
        this.request('/rongzi/warmlist', this.params).then((res) => {
            this.dataList = res.data;
        })
        ;
    }
}
