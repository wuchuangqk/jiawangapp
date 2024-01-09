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
    monitorList = []; // 流程监控
    public pageindex = 1;
    public keyword = '';
    public hasnext = 1;
    public payload: any = {};
    public menuList = [
        // { title: '拟办收文' },
        { title: '待办收文' },
        { title: '已办收文' },
        { title: '流程监控' },
        // { title: '收文归档' },
        // { title: '收文审核' }
    ];
    public index = 0;
    isHasNiBan: boolean = false
    isGetPermission = false
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
        this.request('/home/homeaccess', {}).then(res => {
            this.isHasNiBan = res.data['拟办收文']
            if (this.isHasNiBan) {
                this.menuList.unshift({ title: '拟办收文' })
                this.index = 0
            }
            this.isGetPermission = true
        })
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

    /**
     * 流程监控
     */
    getMonitorList() {
        this.request('/receipt/monitorlist', {
            keyword: this.keyword
        }).then((res) => {
            this.monitorList = res.data;
        });
    }
    async getGuiDangList() {
        const res = await this.request('/receipt/hasdone', {
            keyword: this.keyword,
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
        } else if (this.index === 3) {
            this.getMonitorList()
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
    async loadData(event) {
        this.pageindex++;
        const isHasNext = Number(this.hasnext) === 1;
        console.log(isHasNext);
        if (isHasNext) {
            this.payload.pageindex = this.pageindex;

            this.payload.keyword = this.keyword;
            const res = (await this.request('/receipt/hasdone', this.payload));
            this.guiDangList = this.guiDangList.concat(res.data);
            this.hasnext = res.hasnext;
        } else {
            // await this.dialogService.toast('已加载所有数据！');
        }
        event.target.complete();
    }
}
