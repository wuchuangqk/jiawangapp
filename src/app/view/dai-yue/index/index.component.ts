import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
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
    LiuChengJianKongList = [];
    public menuList = [
        { title: '我申请的' },
        { title: '待我审批的' },
        { title: '我已审批的' },
        { title: '流程监控' },
    ];
    public index = 0;
    constructor(
        public http: HttpService,
        public router: Router,
        public navController: NavController,
        public dialogService: DialogService,
        private events: Events,
        public route?: ActivatedRoute,
    ) {
        super(http, router, navController, dialogService);

    }
    ngOnInit() {
        this.getDocumentList();
        this.events.subscribe(AppConfig.Synthesize.List, () => {
            this.getDocumentList();
        });
        this.events.subscribe(AppConfig.Synthesize.ShenPiList, () => {
        });
    }
    ngOnDestroy(): void {
        this.events.unsubscribe(AppConfig.Synthesize.List);
        this.events.unsubscribe(AppConfig.Synthesize.ShenPiList);
    }
    change() {
    }
    doDaiBan(item) {
        const id = item.id;
        const type = item.activityname;
        const itemTitle = item.title;
        const contentTitle = '';
        switch (type) {
            case 'message': {
                this.nav(`common_view/${id}`, {
                    id,
                    title: itemTitle,
                    url: '/notices/list/',
                    contentTitle
                });
                break;
            }
            case 'trendofwork': {
                this.nav(`notice/exchange-view/${id}`, {
                    id,
                    title: itemTitle,
                    url: '/work_dynamics/list/',
                    contentTitle
                });
                break;
            }
            case 'article': {
                this.nav('detail', {
                    id,
                    title: '收发文系统',
                    url: '/documents/slist',
                    contentTitle,
                    document_type: 0,
                    handle_status: 0,
                    handleUrl: '/documents/handle_document',
                });
                break;
            }
            case 'fwtip': {
                this.nav('detail', {
                    id,
                    title: '发文系统',
                    url: '/documents/flist',
                    contentTitle,
                    document_type: 1,
                    handle_status: 1,
                    handleUrl: '/documents/handle_document',
                });
                break;
            }
            case 'swsh': {
                this.nav('detail', {
                    id,
                    title: '收文系统',
                    url: '/documents/slist',
                    contentTitle,
                    isShenPi: true,
                    handle_status: 0,
                    document_type: 0,
                    handleUrl: '/documents/handle_document',
                });
                break;
            }
            case 'sign': {
                this.nav('SignDetailPage', {
                    id,
                    title: itemTitle
                });
                break;
            }

            case 'qingjiado': {// 请假管理
                this.nav('/leave/approve', {
                    id,
                    title: itemTitle,
                    url: '/qingjia/shenpi_detail',
                    contentTitle,
                    handleUrl: '/qingjia/shenpi_save',
                });
                break;
            }
            case 'qingjiadofinish': {// 请假管理完成
                this.nav('/leave/detail', {
                    id,
                    title: itemTitle,
                    url: '/qingjia/shenpi_detail',
                    contentTitle,
                });
                break;
            }
            case 'jiabando': {// 加班管理
                this.nav('/overtime-work/approve', {
                    id,
                    title: itemTitle,
                    contentTitle,
                    url: '/jiaban/shenpi_detail',
                    handleUrl: '/jiaban/shenpi_save'
                });
                break;
            }

            case 'jiabandofinish': {// 请假管理完成
                this.nav('/overtime-work/detail', {
                    id,
                    title: itemTitle,
                    url: '/jiaban/shenpi_detail',
                    contentTitle,
                });
                break;
            }
            case 'waichudo': {// 外出管理
                this.nav('go-out/approve', {
                    id,
                    title: itemTitle,
                    contentTitle,
                    url: '/waichu/shenpi_detail',
                    handleUrl: '/waichu/shenpi_save',
                });
                break;
            }

            case 'waichudofinish': {// 外出管理完成
                this.nav('/go-out/detail', {
                    id,
                    title: itemTitle,
                    url: '/waichu/shenpi_detail',
                    contentTitle,
                });
                break;
            }
            case 'zhspdo': {// 综合管理管理
                this.nav('synthesize/approve', {
                    id,
                    title: itemTitle,
                    contentTitle,
                    url: '/zhsp/zhsp_detail',
                    handleUrl: '/zhsp/shenpi_save',
                });
                break;
            }

            case 'zhspdofinish': {// 综合管理管理完成
                this.nav('synthesize/detail', {
                    id,
                    title: itemTitle,
                    contentTitle,
                    url: '/zhsp/zhsp_detail',
                });
                break;
            }
            // 置产购置管理
            case 'zhigou': {
                this.nav('property/approve', {
                    id,
                    title: itemTitle,
                    contentTitle,
                    url: '/zhigou/zhigou_detail',
                    handleUrl: '/zhigou/shenpi_save',
                });
                break;
            }

            // 置产购置管理完成
            case 'zhigoufinish': {
                this.nav('property/detail', {
                    id,
                    title: itemTitle,
                    contentTitle,
                    url: '/zhigou/zhigou_detail',
                });
                break;
            }
            // 文化宣传导航
            case 'wenxuan': {
                this.nav('cultural-propaganda/detail', {
                    id,
                    title: '文化宣传详情',
                    contentTitle,
                    url: '/notices/wenxuan_detail',
                });
                break;
            }
            // 报销管理管理完成
            case 'bxspdo': {
                this.nav('bao-xiao/approve', {
                    title: itemTitle,
                    url: '/baoxiao/zhsp_detail',
                    handleUrl: '/baoxiao/shenpi_save',
                    document_type: 1,
                    id,
                    handle_status: '1'
                });
                break;
            }
            case 'bxspdofinish': {
                this.nav('bao-xiao/detail', {
                    id,
                    title: itemTitle,
                    contentTitle,
                    url: '/baoxiao/zhsp_detail',
                });
                break;
            }


            case 'letterdo': {
                this.nav('detail', {
                    title: itemTitle,
                    url: '/letter/list/',
                    handleUrl: '/letter/handle_letter',
                    document_type: 1,
                    id,
                    handle_status: '1'
                });
                break;
            }
            case 'letterdofinish': {
                this.nav('detail', {
                    title: itemTitle,
                    url: '/letter/list/',
                    handleUrl: '/letter/handle_letter',
                    document_type: 1,
                    id,
                    handle_status: '0'
                });
                break;
            }

            case 'zcsp': {
                this.nav('zi-chan/approve', {
                    title: itemTitle,
                    url: '/letter/list/',
                    handleUrl: '/letter/handle_letter',
                    document_type: 1,
                    id,
                    handle_status: '0'
                });
                break;
            }
        }

    }
    getDocumentList() {
        this.request('/home/ToReadlist', {}).then((res) => {
            this.itemList = res.data;
        });
    }
    doRefresh(event) {
        super.doRefresh(event);
    }
}
