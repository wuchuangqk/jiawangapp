import { Component } from '@angular/core';
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

interface IConfig {
    url: string;
    data: object;
}
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage extends BasePage {
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
    ) {
        super( http, router, navController, dialogService);
        this.platform.ready().then(() => {
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
                this.jPushModel.resumePush();
                this.jPushModel.init();
                this.jPushModel.getRegistrationID().then((id) => {
                    this.jPushModel.setAlias(this.jPushModel.getPersonAlias());
                    this.jPushModel.listenOpenNotification();
                });
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
        this.dialogService.alert(JSON.stringify(json));
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
                    this.nav('common_view', {
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
                case 'sign':
                    this.nav('SignDetailPage', {
                        id,
                        title: itemTitle
                    });
                    break;
            }
        }, itemTitle , btnText);
    }
    getHomeConfigData() {
        this.request('/users/home_configure', {}).then((res) => {
            this.itemList[0].bage = Number(res.data.tzgg);
            this.itemList[2].bage = Number(res.data.sw);
            this.itemList[3].bage = Number(res.data.fw);
            this.itemList[4].bage = Number(res.data.gzdt);
        }).catch((err) => {
            console.log(err);
        });
    }
    isHuaWei() {
        return this.device.manufacturer.toLowerCase().indexOf('huawei') >= 0;
    }
    doRefresh(event) {
        super.doRefresh(event);
        this.getHomeConfigData();
    }


}
