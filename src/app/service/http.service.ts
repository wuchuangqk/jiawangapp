import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { Router } from '@angular/router';
import { DialogService } from './dialog.service';
import { environment } from '../../environments/environment.prod';
import {NavController, Platform} from '@ionic/angular';
import {Device} from '@ionic-native/device/ngx';
import {HuaWeiPushProvider} from './hua-wei-push';
import {JPushModel} from '../view/home/jPush.model';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public BaseUrl = environment.host;
  private failCodeMap = new Map([
    [0, { msg: '未知错误' }],
    [400, { msg: '请求错误' }],
    [401, { msg: '未认证' }],
    [403, { msg: '未授权' }],
    [404, { msg: '请求地址错误' }],
    [405, { msg: '请求方式错误' }],
    [408, { msg: '请求超时' }],
    [422, { msg: '验证错误' }],
    [500, { msg: '服务器内部错误' }],
    [501, { msg: '服务未实现' }],
    [502, { msg: '网关错误' }],
    [503, { msg: '服务不可用' }],
    [504, { msg: '网关超时' }],
    [505, { msg: 'HTTP版本不受支持' }]
  ]);
  constructor(
      private httpRequest: HttpRequestService,
      private router: Router,
      private platform: Platform,
      private device: Device,
      private huaWeiPushProvider: HuaWeiPushProvider,
      private dialogService: DialogService,
      private jPushModel: JPushModel,
      private navController: NavController,
  ) {
  }
  public get(url: string, data): Promise<any> {
    return this.httpRequest.get(url, data)
        .toPromise().catch((error) => {
      this.handleError(error);
    });
  }
  public post(url: string, data): Promise<any> {
    return this.httpRequest.post(url, data).toPromise().catch((error) => {
      this.handleError(error);
    });
  }
  public uploadFile(url: string, data, filePath): Promise<any> {
    return this.httpRequest.uploadFile(url, data, filePath).catch((error) => {
      this.handleError(error);
    });
  }
  private handleError(error): void {
    this.dialogService.toast(this.failCodeMap.get(error.status).msg);
  }

  logout() {
    localStorage.clear();
    if (this.platform.is('android')) {
      if (this.isHuaWei() && Number(this.device.version) >= 7) {// 判断是否为华为手机并且安卓版本号大于等于7
        this.huaWeiPushProvider.stop();
        navigator["app"].exitApp();
      } else {
        this.jPushModel.stopPush();
        this.navController.navigateRoot('login');
      }
    } else {
      this.navController.navigateRoot('login');
    }
  }
  isHuaWei() {
    return this.device.manufacturer.toLowerCase().indexOf('huawei') >= 0;
  }


}
