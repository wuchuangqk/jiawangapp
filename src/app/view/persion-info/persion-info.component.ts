import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../base/base-page';
import {HttpService} from '../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController, Platform} from '@ionic/angular';
import {DialogService} from '../../service/dialog.service';
import {AppVersion} from '@ionic-native/app-version/ngx';
import {Device} from '@ionic-native/device/ngx';
import {HuaWeiPushProvider} from '../../service/hua-wei-push';
import {JPushModel} from '../home/jPush.model';

@Component({
  selector: 'app-persion-info',
  templateUrl: './persion-info.component.html',
  styleUrls: ['./persion-info.component.scss'],
})
export class PersionInfoComponent extends BasePage implements OnInit {
    public version = '';
  public userInfo = {
    name: '',
    depart: '',
    position: '',
  };
  constructor(
      public http: HttpService,
      public router: Router,
      public navController: NavController,
      public dialogService: DialogService,
      public appVersion: AppVersion,
      public platform: Platform,
      public device: Device,
      public huaWeiPushProvider: HuaWeiPushProvider,
      public jPushModel: JPushModel,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService);
    this.title = '个人中心';
    this.platform.ready().then(() => {
      this.getAppVersion();
    });
  }

  ngOnInit() {
      if (localStorage.userInfo) {
      this.userInfo = JSON.parse(localStorage.userInfo);
    } else {
    }
  }
  logout() {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('isLogin');
      localStorage.removeItem('num');
      localStorage.removeItem('access_token');
      if (this.platform.is('android')) {
      if (this.isHuaWei() && Number(this.device.version) >= 7) {// 判断是否为华为手机并且安卓版本号大于等于7
        this.huaWeiPushProvider.stop();
        navigator['app'].exitApp();
      } else {
        this.jPushModel.stopPush();
        this.navController.navigateRoot('login');
      }
    } else {
      this.navController.navigateRoot('login');
    }
  }
  isHuaWei() {
    if(!this.device.manufacturer){
      return false;
    }else{
      return this.device.manufacturer.toLowerCase().indexOf('huawei') >= 0;
    }
  }
  getAppVersion() {
    this.appVersion.getVersionNumber().then((version) => {
      this.version = version;
    });
  }
  submit() {
    this.nav('feedback');
  }
}
