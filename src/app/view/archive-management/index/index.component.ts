import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
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
    myShenPiList = [];
    public index = 0;
    public pid = '00000000-0000-0000-0000-000000000000';
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
        this.route.queryParamMap.subscribe((params: ParamMap) => {
            console.log(params);
            this.pid = params.get('pid');
            this.getDocumentList();
        });
        this.getDocumentList();
        this.events.subscribe(AppConfig.FinanceDetail.list, () => {
            this.getDocumentList();
        });
    }
    ngOnDestroy(): void {
        this.events.unsubscribe(AppConfig.FinanceDetail.list);
    }
    dodo(item) {
        if (item.isDir) {
            this.nav('archive-management/'+item.id, {pid: item.id});
        }else{
            // console.log(item);
            this.nav(`archive-management/${item.id}/detail`, {id: item.id});
        }
    }
    getDocumentList() {
        this.request( '/NewDangAn/getList', {
            pid: this.pid,
            userId: JSON.parse(localStorage.userInfo).id
        }).then((res) => {
            console.log(res);
            this.itemList = res.data;
        });
    }
    doRefresh(event) {
        super.doRefresh(event);
    }
}
