import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import { DateProvider } from '../../../service/Date';
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
    // 已办收文
    yiBanList = [];
    guiDangList = [];
    public keyword = '';
    public menuList = [
        { title: '拟办收文' },
        { title: '待办收文' },
        { title: '已办收文' },
        // { title: '收文归档' },
        // { title: '收文审核' }
    ];
    public index = 0;
    constructor(
        public http: HttpService,
        public router: Router,
        public navController: NavController,
        public dialogService: DialogService,
        private dateProvider: DateProvider,
        private events: Events,
        public route?: ActivatedRoute,
    ) {
        super(http, router, navController, dialogService);
        // this.url = this.query('url');
        // this.slides.startAutoplay();

    }
    ngOnInit() {
        this.events.subscribe((AppConfig.Document.DocumentList), () => {
            this.getDocumentList();
            this.getRequst();
        });
        this.events.subscribe((AppConfig.Document.DocumentShenPiList), () => {
            this.getShenPiList();
        });
        this.getDocumentList();
        this.getShenPiList();
    }
    ngOnDestroy(): void {
        this.events.unsubscribe((AppConfig.Document.DocumentList));
        this.events.unsubscribe((AppConfig.Document.DocumentShenPiList));
    }
    change() {
        this.slides.getActiveIndex().then((index) => {
            this.index = index;
            this.getRequst();
        });
    }
    segmentChange(index) {
        this.index = index;
        this.slides.slideTo(index);
    }

    /**
     * 拟办收文列表
     * */
    getDocumentList() {
        this.request('/receipt/auditlist', {
            document_type: 0,
            keyword: this.keyword
        }).then((res) => {
            this.itemList = res.data;
        });
    }
    getShenPiList() {
        this.request('/documents/sshlist', {
            keyword: this.keyword
        }).then((res) => {
            this.shenPiList = res.data;
        });
    }
    getYiBanList() {
        this.request('/receipt/todo', {
            keyword: this.keyword
        }).then((res) => {
            this.yiBanList = res.data;
        });
    }
    async getGuiDangList() {
        const res = await this.request('/receipt/hasdone', {
            keyword: this.keyword
        });
        this.guiDangList = res.data;
    }
    getRequst() {
        if (this.index == 0) {
            this.getDocumentList();
        } else if (this.index == 1) {
            // this.getShenPiList();
            this.getYiBanList();
        } else if (this.index == 2) {
            this.getGuiDangList();
        }
    }
    search(e: CustomEvent) {
        console.log(e.detail.value);
        this.keyword = e.detail.value;
        this.getRequst();
    }
    doRefresh(event) {
        super.doRefresh(event);
        this.getRequst();
    }
}
