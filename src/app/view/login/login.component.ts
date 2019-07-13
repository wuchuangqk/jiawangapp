import { Component, OnInit } from '@angular/core';
import {Events, NavController, Platform} from '@ionic/angular';
import {BasePage} from '../../base/base-page';
import {HttpService} from '../../service/http.service';
import { AlertController } from '@ionic/angular';
import { DialogService } from '../../service/dialog.service';
import {Router} from '@angular/router';
import {HuaWeiPushProvider} from '../../service/hua-wei-push';
import { Device } from '@ionic-native/device/ngx';
import * as $ from 'jquery';
import {JPushModel} from '../home/jPush.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BasePage implements OnInit {
    public name: any;
    username = 'meilinhui';
    userid: number;
    password = '12345678';
    num: number;

    constructor(
        public http: HttpService,
        public router: Router,
        public dialogService: DialogService,
        public navController: NavController,
        private events: Events,
        private platform: Platform,
        private device: Device,
        private alertController: AlertController,
        private huaWeiPushProvider: HuaWeiPushProvider,
        public jPushModel: JPushModel,
    ) {
        super(http, router, navController, dialogService);
        // this.name = this.router.query('name');
        this.platform.ready().then(() => {
            // const jPushModel = new JPushModel(this.j);
            // jPushModel.init();
            // jPushModel.listenOpenNotification();
            // jPushModel.getRegistrationID();
        });
    }

    ngOnInit() {
    }
    login() {
        // this.dialogService.loading();
        // alert(JSON.stringify(cordova.plugins));
        // this.jpushProvider.init().then(() => {
        //     console.log ('极光推送初始化成功！');
        // }).catch((err) => {
        //     console.log('极光推送初始化失败！' + err);
        // });
        // this.jpushProvider.getregistrationID((res) => {
        //     alert(JSON.stringify(res));
        // });
       // this.getUuid((res) => {
       //     alert(JSON.stringify(res));
       //     $.get('http://mlh1421.cn/ionic/ionic.php', {username: this.username, push_id: res}, (res) => {
       //         // this.dialogProvider.toast(JSON.stringify(res));
       //     });
       // });
        this.jPushModel.init();
        this.jPushModel.listenOpenNotification();
        this.jPushModel.getRegistrationID().then((id) => {
            $.get('http://mlh1421.cn/ionic/ionic.php', {username: this.username, push_id: id}, (res) => {
            });
        });
        this.request('/users/login', {
            username: this.username,
            password: this.password,
            os: 'android',
            packagename: 'ml',
            uuid: 'aaa'
        }).then((res) => {
            localStorage.access_token = res.data.access_token;
            this.dialogService.dismiss();
            localStorage.isLogin = 1;
            this.navController.navigateRoot('home');
        });

    }
    isHuaWei() {
        return this.device.manufacturer.toLowerCase().indexOf('huawei') >= 0;
    }
    private getUuid(success: Function) {
        if (this.isHuaWei() && Number(this.device.version) >= 7) {// 判断是否为华为手机并且安卓版本号大于等于7
            this.huaWeiPushProvider.isConnected().then(() => {
                this.huaWeiPushProvider.getDeviceToken().then((token) => {
                    success(token);
                });
            }).catch(() => {
                this.huaWeiPushProvider.init();
                this.huaWeiPushProvider.getDeviceToken().then((token) => {
                    success(token);
                });
            });
        } else {
            success(this.device.uuid);
        }
    }
}
