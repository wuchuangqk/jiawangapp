import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
// declare const cordova;

/*
  Generated class for the PushProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: 'root'
})
export class HuaWeiPushProvider {
  private huaweipush: any;
  constructor(
    private platform: Platform,
  ) {

    this.platform.ready().then(() => {
      const cordova: any = (window as any).cordova || {};
      const plugins: any = cordova.plugins || {};
      this.huaweipush = plugins.huaweipush;
    });
  }
  public getDeviceToken(): Promise<any> {
    return new Promise(((resolve, reject) => {
      document.addEventListener('huaweipush.receiveRegisterResult',  (event: any) => {
        resolve(event.token);
      }, false);
    }));
  }
  public  init(): void {
    this.huaweipush.init();
  }
  public connect(): Promise<any> {
    return  new Promise(((resolve, reject) => {
      this.huaweipush.connect((res) => {
        resolve(res);
      }, (res) => {
        reject(res);
      });
    }));

  }
  public isConnected(): Promise<any> {
    return new Promise(((resolve, reject) => {
      this.huaweipush.isConnected((res) => {
        resolve(true);
      }, (res) => {
        reject(false);
      });
    }));
  }

  public stop(): Promise<any> {
    return new Promise(((resolve, reject) => {
      this.huaweipush.stop((res) => {
        resolve(res);
      }, (res) => {
        reject(res);
      });
    }));
  }
  public notificationOpened(): Promise<any> {
    return new Promise((resolve) => {
      document.addEventListener('huaweipush.notificationOpened', function(event: any) {
        resolve(event);
      }.bind(this), false);
    });
  }
  public pushMsgReceived(): Promise<any> {
    return new Promise((resolve) => {
      document.addEventListener('huaweipush.pushMsgReceived', function(event: any) {
        resolve(event);
      }.bind(this), false);
    });
  }
}
