import { Component, OnInit} from '@angular/core';
import { BasePage} from '../base/base-page';
import { HttpService} from '../service/http.service';
import { Router} from '@angular/router';
import { DialogService} from '../service/dialog.service';
import { Events, NavController, Platform} from '@ionic/angular';
import { AppConfig} from '../app.config';
import { Device} from '@ionic-native/device/ngx';
import { JPushModel} from '../view/home/jPush.model';
import { HuaWeiPushProvider} from '../service/hua-wei-push';
import { NativeService} from '../service/NativeService';
import { Badge} from '@ionic-native/badge/ngx';
import $ from 'jquery';

@Component({
  selector: 'app-home-tab',
  templateUrl: 'home-tab.component.html',
  styleUrls: ['home-tab.component.scss']
})
export class HomeTabComponent  extends BasePage implements OnInit {
  public ziChanAndHeTongCount = {};
  public weather: any = {};
  public  itemList: Array<any> = [
    { icon: 'ios-notifications', color: '#7dc6ff', name: 'notice', title: '通知公告', url: '/notices/list', bage: '' , addUrl: 'add', isCanCommit: false , access: true},
    { icon: 'ios-bookmarks', color: '#7dc6ff', name: 'work-diary', title: '工作日志' , url: '/work_logs/list', access: true},
    { icon: 'ios-paper', color: '#73d1d1', name: 'dai-ban', title: '待办事项' , access: true},
    { icon: 'ios-paper', color: '#73d1d1', name: 'dai-yue', title: '待阅事项' , access: true},
    { icon: 'send', color: '#fa7c92', name: 'rong-zi', title: '融资管理', access: false },
    { icon: 'ios-chatbubbles', color: '#7dc6ff', name: 'zi-chan', title: '资产管理', url: '/work_dynamics/list', addUrl: 'exchange-add', isCanCommit: true, access: false },
    { icon: 'md-radio', color: '#fb8862', name: 'decision-making-platform', title: '决策平台', access: false },
    { icon: 'calendar', color: '#b2d76a', name: 'full-map', title: '项目分布', access: true },
  ];
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
    super(http, router, navController, dialogService);
    this.platform.ready().then(() => {
      document.addEventListener('mipush.notificationMessageArrived', this.Your_Notification_Message_Arrived_Function, false);
      plugins.MiPushPlugin.init();
      document.addEventListener('mipush.receiveRegisterResult', this.Your_Receive_Register_Function, false);
    });
  }
  Your_Receive_Register_Function(data) {
    //alert(JSON.stringify(data));
  }
  Your_Notification_Message_Arrived_Function(data) {
    //alert(JSON.stringify(data));
  }

  init() {
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
        this.dialogService.alert(id);
        this.jPushModel.setAlias(this.jPushModel.getPersonAlias());
        this.jPushModel.listenOpenNotification();
        $.get('http://192.168.1.48/thinkphp_5.0.24/public/', {
          username: JSON.parse(localStorage.userInfo).name,
          push_id: id,
          time: new Date().toString()
        }, (res) => {
        });
      });
    }
  }
  ngOnInit() {
    this.getHomeConfigData();
    this.getWeather();
    this.events.subscribe(AppConfig.Home.Badge, () => {
      this.getHomeConfigData();
      this.getWeather();
    });
  }
  getWeather() {
    $.get('https://restapi.amap.com/v3/weather/weatherInfo?key=771e4903465ad46e0d524d5190d148f1&city=%E8%B4%BE%E6%B1%AA', (res) => {
      console.log(res);
      this.weather = res.lives[0];
    });
  }
  getThisWeek() {
    const date = new Date();
    let week;
    if (date.getDay() === 0) { week = '星期日'; }
    if (date.getDay() === 1) { week = '星期一'; }
    if (date.getDay() === 2) { week = '星期二'; }
    if (date.getDay() === 3) { week = '星期三'; }
    if (date.getDay() === 4) { week = '星期四'; }
    if (date.getDay() === 5) { week = '星期五'; }
    if (date.getDay() === 6) { week = '星期六'; }
    return week;
  }
  doRefresh(event) {
    super.doRefresh(event);
    this.getHomeConfigData();
    this.getWeather();
  }

  getHomeConfigData() {
    this.request('/home/homeaccess', {}).then((res) => {
      console.log(res);
      const data = res.data;
      this.itemList[4].access = data.rz;
      this.itemList[5].access = data.zc;
      this.itemList[6].access = data.jc;
    });
    this.request('/home/homecont', {}).then((res) => {
      this.itemList[0].badge = Number(res.data.noticecount);  //  通知公告
      this.itemList[2].badge = Number(res.data.todocount);    //  收文系统
      this.itemList[3].badge = Number(res.data.toreadcount);    //  发文系统
    }).catch((err) => {
      console.log(err);
    });
  }
  getThisDate() {
    const  d = new Date();
    const date = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${year}年${this.addZero(month)}月${this.addZero(date)}`;
  }
  isHuaWei() {
    if (this.platform.is('android')) {
      if (this.device.manufacturer) {
        return this.device.manufacturer.toLowerCase().indexOf('huawei') >= 0;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  addZero(num) {
    let str = num + '';
    if (str.length <= 1) {
      str = '0' + str;
    }
    return str;
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

    this.dialogService.alert(type);

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
      }
    }, itemTitle , '查看');
  }

}
