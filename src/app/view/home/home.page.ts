import {Component, OnInit} from '@angular/core';
import { HttpService } from '../../service/http.service';
import {BasePage} from '../../base/base-page';
import { HomeModel } from './home.page.model';
import {DialogService} from '../../service/dialog.service';
import {Router} from '@angular/router';
import {Events, NavController, Platform} from '@ionic/angular';
import {AppConfig} from '../../app.config';
import {JPushModel} from './jPush.model';
import {Device} from '@ionic-native/device/ngx';
import {HuaWeiPushProvider} from '../../service/hua-wei-push';
import {NativeService} from '../../service/NativeService';
import { Badge } from '@ionic-native/badge/ngx';
import $ from 'jquery';

interface IConfig {
    url: string;
    data: object;
}
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage extends BasePage implements OnInit {
    public itemList: any = HomeModel.itemList;
    public title = '首页';
    constructor(
        public http: HttpService,
        public router: Router,
        public dialogService: DialogService,
        public navController: NavController,
        public events: Events,
        public platform: Platform,
        public device: Device,
        public jPushModel: JPushModel,
        public huaWeiPushProvider: HuaWeiPushProvider,
        public nativeService: NativeService,
        public badge: Badge,
    ) {
        super( http, router, navController, dialogService);
        this.platform.ready().then(() => {
            if (this.platform.is('android') || this.platform.is('ios')) {
                this.nativeService.detectionUpgrade();
                if (this.isHuaWei() && Number(this.device.version) >= 7) {// 判断是否为华为手机并且安卓版本号大于等于7
                    this.huaWeiPushProvider.isConnected().then(() => {
                        console.log('已经链接！');
                        this.huaWeiPushNotificationOpened();
                    }).catch(() => {
                        console.log('未链接！');
                        this.huaweiPush();
                    });
                } else {
                    // this.jPushModel.resumePush();
                    this.jPushModel.init();
                    // this.jPushModel.listenReceiveNotification();
                    this.jPushModel.getRegistrationID((id) => {
                        // alert(id);
                        $.get('http://mlh1421.cn/ionic/ionic.php', {
                            username: JSON.parse(localStorage.userInfo).name,
                            push_id: this.jPushModel.getPersonAlias(),
                            time: new Date().toString()
                        }, (res) => {
                        });
                        this.jPushModel.setAlias(this.jPushModel.getPersonAlias());
                        this.jPushModel.listenOpenNotification();
                    });
                }
            }
        });
    }
    ngOnInit() {
        super.ngOnInit();
        this.getHomeConfigData();
        this.events.subscribe(AppConfig.Home.Badge, () => {
            this.getHomeConfigData();
        });
    }
    huaWeiPushNotificationOpened() {
        document.addEventListener('huaweipush.notificationOpened', function(event) {
            this.handleHuaWei(event);
        }.bind(this), false);
    }
    huaweiPush() {
        this.huaWeiPushProvider.getDeviceToken().then((token) => {
            this.huaWeiPushProvider.connect();
            this.huaWeiPushProvider.isConnected().then((res) => {
                console.log('已经连接！');
            });
        });
        this.huaWeiPushProvider.init();
        document.addEventListener('huaweipush.notificationOpened', function(event) {
            this.handleHuaWei(event);
        }.bind(this), false);
    }
    handleHuaWei(json) {
        const extras = json.extras;
        const temp: any = {};
        for (const _item of extras) {
            for (const item in _item) {
                temp[item] = _item[item];
            }
        }
        const dialogMsg = temp.itemTitle;
        const itemTitle = temp.itemTitle;
        const contentTitle = temp.contentTitle;
        const type = temp.type;
        const id = temp.relId;
        let btnText = '';
        if (type === 'message') {
            btnText = '前往查看';
        } else {
            btnText = '确定';
        }


        this.dialogService.alert(contentTitle, () => {
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
                        url: '/notices/list/',
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

                case 'qingjiado': {// 请假审批
                    this.nav('/leave/approve', {
                        id,
                        title: itemTitle,
                        url: '/qingjia/shenpi_detail',
                        contentTitle,
                        handleUrl: '/qingjia/shenpi_save',
                    });
                    break;
                }
                case 'qingjiadofinish': {// 请假审批完成
                    this.nav('/leave/detail', {
                        id,
                        title: itemTitle,
                        url: '/qingjia/shenpi_detail',
                        contentTitle,
                    });
                    break;
                }
                case 'jiabando': {// 加班审批
                    this.nav('/overtime-work/approve', {
                        id,
                        title: itemTitle,
                        contentTitle,
                        url: '/jiaban/shenpi_detail',
                        handleUrl: '/jiaban/shenpi_save'
                    });
                    break;
                }

                case 'jiabandofinish': {// 请假审批完成
                    this.nav('/overtime-work/detail', {
                        id,
                        title: itemTitle,
                        url: '/jiaban/shenpi_detail',
                        contentTitle,
                    });
                    break;
                }
                case 'waichudo': {// 外出审批
                    this.nav('go-out/approve', {
                        id,
                        title: itemTitle,
                        contentTitle,
                        url: '/waichu/shenpi_detail',
                        handleUrl: '/waichu/shenpi_save',
                    });
                    break;
                }

                case 'waichudofinish': {// 外出审批完成
                    this.nav('/go-out/detail', {
                        id,
                        title: itemTitle,
                        url: '/waichu/shenpi_detail',
                        contentTitle,
                    });
                    break;
                }
                case 'zhspdo': {// 综合审批审批
                    this.nav('synthesize/approve', {
                        id,
                        title: itemTitle,
                        contentTitle,
                        url: '/zhsp/zhsp_detail',
                        handleUrl: '/zhsp/shenpi_save',
                    });
                    break;
                }

                case 'zhspdofinish': {// 综合审批审批完成
                    this.nav('synthesize/detail', {
                        id,
                        title: itemTitle,
                        contentTitle,
                        url: '/zhsp/zhsp_detail',
                    });
                    break;
                }
                // 置产购置审批
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

                // 置产购置审批完成
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
            }
        }, itemTitle , '查看');
    }
    getHomeConfigData() {
        this.request('/users/home_configure', {}).then((res) => {
            this.itemList[0].bage = Number(res.data.tzgg);  //  通知公告
            this.itemList[1].bage = Number(res.data.gzrz);  //  工作日志(该项没有推送)
            this.itemList[2].bage = Number(res.data.sw);    //  收文系统
            this.itemList[3].bage = Number(res.data.fw);    //  发文系统
            this.itemList[4].bage = Number(res.data.gzdt);  //  工作交流
            this.itemList[5].bage = Number(res.data.jbdb);  //  交办督办
            this.itemList[6].bage = Number(res.data.qjsp);  //  请假审批
            this.itemList[7].bage = Number(res.data.jbsp);  //  加班审批
            this.itemList[8].bage = Number(res.data.wcsp);  //  外出审批
            this.itemList[9].bage = Number(res.data.zhsp);  //  综合审批
            // this.itemList[10].bage = Number(res.data.zcgz); //  资产购置
            // this.itemList[11].bage = Number(res.data.whxc); //  文化宣传
        }).catch((err) => {
            console.log(err);
        });
    }
    isHuaWei() {
        if (this.platform.is('android')) {
            return this.device.manufacturer.toLowerCase().indexOf('huawei') >= 0;
        } else {
            return false;
        }
    }
    doRefresh(event) {
        super.doRefresh(event);
        this.getHomeConfigData();
    }


}
