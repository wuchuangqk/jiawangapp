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
import {AppVersion} from '@ionic-native/app-version/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BasePage implements OnInit {
    public name: any;
    username = '';
    public packagename: string;
    public uuid: string;
    public os: string;
    password = '';
    num: number;

    constructor(
        public http: HttpService,
        public router: Router,
        public dialogService: DialogService,
        public navController: NavController,
        private events: Events,
        private platform: Platform,
        private device: Device,
        private appVersion: AppVersion,
        private nativeStorage: NativeStorage,
        private alertController: AlertController,
        private huaWeiPushProvider: HuaWeiPushProvider,
    ) {
        super(http, router, navController, dialogService);
        this.platform.ready().then(() => {
            if (this.platform.is('android')) {
                if (this.device.platform) {
                    this.os = this.device.platform.toLowerCase();
                    this.getPackageName().then((packagename) => {
                        this.packagename = packagename;
                    });
                    this.getUuid((uuid) => {
                        // this.dialogService.toast(uuid);
                        // tslint:disable-next-line:max-line-length
                        $.get('http://192.168.1.6/thinkphp_5.0.24/public/', {username: this.username, push_id: uuid || '1232333'}, (res) => {});
                        this.uuid = uuid;
                    });
                }
            }
        });
    }

    ngOnInit() {
    }
    public checkParams(): boolean {
        if (!this.username) {
            this.dialogService.toast('请输入用户名！');
            return false;
        } else if (!this.password) {
            this.dialogService.toast('请输入密码！');
            return false;
        }
        return true;
    }
    login() {
        if (!this.checkParams()) {
            return;
        }
        // this.dialogService.loading();
        if (this.platform.is('android')) {
            if (this.uuid) {
                this.startLogin(this.uuid);
            } else {
                this.getUuid((uuid) => {

                    this.startLogin(uuid || '1232333');
                });
            }
        } else {
            this.startLogin('1232333');
        }
    }
    startLogin(uuid) {
        this.request('/users/login', {
            username: this.username,
            password: this.password,
            os: this.os || 'android',
            packagename: 'com.bnp.yuansong',
            uuid,
        }).then((res) => {
            localStorage.access_token = res.data.access_token;
            this.dialogService.dismiss();
            localStorage.userInfo = JSON.stringify(res.data);
            localStorage.isLogin = 1;
            this.navController.navigateRoot('tabs');
        });

    }
    isHuaWei() {
      if (!this.device.manufacturer) {
        return false;
      } else {
        return this.device.manufacturer.toLowerCase().indexOf('huawei') >= 0;
      }
    }
    getPackageName() {
        return  this.appVersion.getPackageName().then((packagename) => {
            this.packagename = packagename;
            return packagename;
        });
    }
    private getUuid(success: Function) {
        if (this.isHuaWei() && Number(this.device.version) >= 7) {// 判断是否为华为手机并且安卓版本号大于等于7
            this.huaWeiPushProvider.isConnected().then(() => {
                const token = this.nativeStorage.getItem('token');
                // this.dialogService.alert(token);
                $.get('http://192.168.1.6/thinkphp_5.0.24/public/', {username: this.username, push_id: token || '1232333'}, (res) => {});
                success(token);
            }).catch(() => {
                this.huaWeiPushProvider.init();
                this.huaWeiPushProvider.getDeviceToken().then((token) => {
                    this.nativeStorage.setItem('token', token);
                    // tslint:disable-next-line:max-line-length
                    $.get('http://192.168.1.6/thinkphp_5.0.24/public/', {username: this.username, push_id: token || '1232333'}, (res) => {});
                    success(token);
                });
            });
        } else {
            success(this.device.uuid);
        }
    }
}
