import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Platform , NavController , ToastController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import {Subscription} from 'rxjs';
import { Events } from '@ionic/angular';
import {AppConfig} from './app.config';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {

  backButtonPressed = true; // 用于判断返回键是否触发
  customBackActionSubscription: Subscription;
  url;
  constructor(
      public platform: Platform,
      public splashScreen: SplashScreen,
      public statusBar: StatusBar,
      public router: Router,
      public appMinimize: AppMinimize,
      public events: Events,
      public navController: NavController, // 导航控制器
      public toastCtrl: ToastController,
  ) {
    this.initializeApp();
   // this.isLogin();
  }

  public isLogin() {
    if (!localStorage.isLogin) {
      this.navController.navigateRoot('login');
    } else {
      this.navController.navigateRoot('home');
    }
  }
  initializeApp() {
    this.initRouterListen();
    this.platform.ready().then(() => {
        this.splashScreen.hide();
        this.statusBar.styleLightContent();
        // styleLightContent 字体显示成白色
        this.statusBar.backgroundColorByHexString('#3880ff');
        this.registerBackButtonAction(); // 注册返回按键事件
        this.platform.resume.subscribe(); // 弹出框
    });
  }


  registerBackButtonAction() {
    this.customBackActionSubscription = this.platform.backButton.subscribe(() => {

      if (this.url === '/home' || this.url === '/login' || this.url === '/camera') {
        if (this.backButtonPressed) {
          this.appMinimize.minimize();
        } else {
          this.backButtonPressed = true;
        }
      } else {
        this.navController.back();
      }

      // if (this.backButtonPressed) {
      //    this.appMinimize.minimize();
      // } else {
      //   this.toastCtrl.create({
      //     message: '再按一次退出应用'
      //   });
      //   this.backButtonPressed = true;
      // }
    });
  }
  initRouterListen() {
    this.router.events.subscribe(event => { // 需要放到最后一个执行
      if (event instanceof NavigationEnd) {
        this.url = event.url;
        this.toastCtrl.create({
          message: this.url
        }).then(() => {
          // console.log(event.url);
          this.events.publish(AppConfig.ActivatedRoute.ActivatedRouteChange);
        });
      }
    });
  }
}
