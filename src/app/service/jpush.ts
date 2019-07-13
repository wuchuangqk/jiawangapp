import { Injectable } from '@angular/core';
import { JPush } from '@jiguang-ionic/jpush/ngx';
import { Events} from '@ionic/angular';
import { AppConfig } from '../app.config';

/*
  Generated class for the JpushProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: 'root'
})
export class JpushProvider {
  constructor(
    private jPush: JPush,
    private events: Events,
  ) {
    this.listenOpenNotification();
  }

  public init(): any {
    return  this.jPush.init();
  }
  public isPushStopped() {// 检查极光推送是否处于关闭状态
    return this.jPush.isPushStopped();
  }
  public resumePush() { // 重新开启极光推送
    return  this.jPush.resumePush();
  }
  public stopPush() {
    return  this.jPush.stopPush();
  }
  public getregistrationID() {
      this.jPush.getRegistrationID();
  }
  // 获取极光推送别名
  getAlias() {
    return  this.jPush.getAlias({ sequence: 100 });
  }
  setAlias(alias) {
    return this.jPush.setAlias({ sequence: 100, alias});
  }
// 监听打开状态栏事件
  public listenOpenNotification() {
      document.addEventListener('jpush.openNotification', onOpenNotification => {
        this.events.publish(AppConfig.JPushOpenNotification, onOpenNotification);
      }, false);
  }


  /**
   * 监听前台接收通知
   */
  public listenReceiveNotification(): Promise<any> {
    return new Promise(((resolve, reject) => {
      document.addEventListener('jpush.receiveNotification', onReceiveNotification => {
        resolve(onReceiveNotification);
      }, false);
    }));
  }
  public resetBadge() {
    return this.jPush.resetBadge();
  }
  public setApplicationIconBadgeNumber() {
    return this.jPush.setApplicationIconBadgeNumber(0);
  }
  /**
   * 监听后台接收通知
   * context-avilable -- 此参数，服务器必须要传，不然不会进入此方法
   */
  listenBackgroundNotification() {
    document.addEventListener('jpush.backgroundNotification', onBackgroundNotification => {
      // alert("后台收到远程通知");

      this.jPush.resetBadge();
      this.jPush.setApplicationIconBadgeNumber(0);
    }, false);
  }

  /**
   * 监听接收自定义消息
   */
  listenReceiveMessage() {
    document.addEventListener('jpush.receiveMessage', onReceiveMessage =>  {
      // alert('收到自定义消息');
    }, false);
  }

}
