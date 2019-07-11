import { Component, OnInit, ViewChild } from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import { DateProvider } from '../../../service/Date';
import { IonSlides } from '@ionic/angular';
import { NavController } from "@ionic/angular";

@Component({
    selector: 'index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
})
export class IndexComponent extends BasePage implements OnInit {
    @ViewChild(IonSlides) slides: IonSlides;
    itemList = [];
    shenPiList = [];
    public menuList=[
        { title:"请假管理" },
        { title:"待我审批" }
    ];    
    public index = 0;
    constructor(
        public http: HttpService,
        public router: Router,
        public navController: NavController,
        public dialogService: DialogService,
        private dateProvider: DateProvider,
        public route?: ActivatedRoute,
    ) {
        super(http, router,navController, dialogService);
        // this.url = this.query('url');
        // this.slides.startAutoplay();

    }
    ngOnInit() {
        this.getDocumentList();
        this.getShenPiList();
    }
    change() {
        this.slides.getActiveIndex().then((index) => {
            this.index = index;
        });
    }
    segmentChange(index) {
        this.index = index;
        this.slides.slideTo(index);
    }

    getDocumentList() {
        this.request('/qingjia/qingjialist', {
            document_type: 0
        }).then((res) => {
            this.itemList = res.data;
        });
    }
    getShenPiList() {
        this.request('/qingjia/shenpi_list', {}).then((res) => {
            this.shenPiList = res.data;
        });
    }
}
