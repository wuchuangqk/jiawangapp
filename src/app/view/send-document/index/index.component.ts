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
    public keyword="";
    public menuList = [
        { title: '发文系统' },
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
    ngOnInit() {
        this.events.subscribe(AppConfig.Document.DocumentList, () => {
            this.getDocumentList();
        });
        this.getDocumentList();
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
    getDocumentList() {
        this.request('/documents/flist', {
            document_type: 1,
            keyword: this.keyword
        }).then((res) => {
            this.itemList = res.data;
        });
    }
    getYiBanList() {
        this.request('/documents/listed', {
            keyword: this.keyword
        }).then((res) => {
            this.yiBanList = res.data;
        });
    }
   async getGuiDangList() {
        const res = await this.request('/documents/DisPatchArchive', {
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
        }else if(this.index==2){
            this.getGuiDangList();
        }
    }
    segmentChange(index) {
        this.index = index;
        this.slides.slideTo(index);
    }
    doRefresh(event) {
        super.doRefresh(event);
        this.getDocumentList();
    }
}
