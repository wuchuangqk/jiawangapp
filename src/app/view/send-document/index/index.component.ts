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
    itemList = [];
    yiBanList = [];
    guiDangList = [];
    public guiDangPageIndex = 1;
    public yiBanPageIndex = 1;
    public keyword = '';
    public guiDangHasNext = 1;
    public guiDangPayload: any = {};
    public yiBanHasNext = 1;
    public yiBanPayload: any = {};

    public menuList = [
        { title: '待办发文' },
        { title: '已办发文' },
        { title: '发文归档' },
        // { title: '收文审核' }
    ];
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
        // this.url = this.query('url');
        // this.slides.startAutoplay();

    }
    async ngOnInit() {
        this.events.subscribe(AppConfig.Document.DocumentList, () => {
              this.getDocumentList();
        });
        await this.getDocumentList();
    }
    ngOnDestroy(): void {
        this.events.unsubscribe(AppConfig.Document.DocumentList);
    }
    change() {
        this.slides.getActiveIndex().then((index) => {
            this.index = index;
            // this.getDocumentList();
            this.getRequst();
        });
    }
    search(e: CustomEvent) {
        console.log(e.detail.value);
        this.keyword = e.detail.value;
        this.getRequst();
    }
    /**
     * 待办
     * */
    async getDocumentList() {
        const res = await this.request('/dispatch/todo', {
            document_type: 1,
            keyword: this.keyword
        });
        this.itemList = res.data;
    }
    async getYiBanList() {
        // dispatch/hasdone
        const res = await this.request('/dispatch/hasdone', {
            keyword: this.keyword
        });
        this.yiBanList = res.data;
        this.yiBanHasNext = res.hasnext;
    }
    async getGuiDangList() {
        const res = await this.request('/dispatch/archive', {
            keyword: this.keyword
        });
        this.guiDangList = res.data;
        this.guiDangHasNext = res.hasnext;
    }
    async getRequst() {
        if (this.index == 0) {
            this.getDocumentList();
        } else if (this.index == 1) {
            // this.getShenPiList();
            await this.getYiBanList();
        } else if (this.index == 2) {
          await  this.getGuiDangList();
        }
    }
    segmentChange(index) {
        this.index = index;
        this.slides.slideTo(index);
    }
    async doRefresh(event) {
        super.doRefresh(event);
        await this.getDocumentList();
    }


    /*
    *  已办上拉加载更多
    */
    async loadYiBanData(event) {
        this.yiBanPageIndex++;
        const isHasNext = Number(this.yiBanHasNext) === 1;
        console.log(isHasNext);
        if (isHasNext) {
            this.yiBanPayload.pageindex = this.guiDangPageIndex;
            this.yiBanPayload.keyword = this.keyword;
            const res = (await this.request('/documents/flisted', this.yiBanPayload));
            this.yiBanList = this.yiBanList.concat(res.data);
            this.yiBanPayload = res.hasnext;
        } else {
            // await this.dialogService.toast('已加载所有数据！');
        }
        event.target.complete();
    }


    /*
    * 归档上拉加载更多
    */
    async loadGuiDangData(event) {
        this.guiDangPageIndex++;
        const isHasNext = Number(this.guiDangHasNext) === 1;
        console.log(isHasNext);
        if (isHasNext) {
            this.guiDangPayload.pageindex = this.guiDangPageIndex;
            this.guiDangPayload.keyword = this.keyword;
            const res = (await this.request('/documents/DisPatchArchive', this.guiDangPayload));
            this.guiDangList = this.guiDangList.concat(res.data);
            this.guiDangHasNext = res.hasnext;
        } else {
            // await this.dialogService.toast('已加载所有数据！');
        }
        event.target.complete();
    }
}
