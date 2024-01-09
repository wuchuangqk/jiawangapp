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
import {LogService} from '../service/LogService';

@Component({
  selector: 'app-home-tab',
  templateUrl: 'home-tab.component.html',
  styleUrls: ['home-tab.component.scss']
})
export class HomeTabComponent  extends BasePage implements OnInit {
    public ziChanAndHeTongCount = {};
    public weather: any = {};
    public  itemList: Array<any> = [
        // tslint:disable-next-line:max-line-length
        // { icon: 'ios-notifications', color: '#7dc6ff', name: 'notice', title: '通知公告', url: '/notices/list', bage: '' , addUrl: 'add', isCanCommit: false , access: true},
        // { icon: 'ios-bookmarks', color: '#7dc6ff', name: 'work-diary', title: '工作日志' , url: '/work_logs/list', access: true},
        { icon: 'list-box', color: '#c1a6f0', name: 'dai-ban', title: '待办事项' , access: true},
        { icon: 'ios-paper', color: '#6cd7ff', name: 'dai-yue', title: '待阅事项' , access: true},
        { icon: 'ios-paper', color: '#73d1d1', name: 'receive-document', title: '收文系统', access: true },
        { icon: 'send', color: '#fa7c92', name: 'send-document', title: '发文系统', access: true },
        { icon: 'ios-people', color: '#fbbd6d', name: 'assign', title: '交办督办', access: true },
        { icon: 'calendar', color: '#b2d76a', name: 'leave', title: '请假管理', access: true },
        { icon: 'ios-alarm', color: '#c1a6f0', name: 'overtime-work', title: '加班管理', access: true },
        { icon: 'md-pin', color: '#a3bdb9', name: 'go-out', title: '外出管理', access: true },
        { icon: 'logo-twitch', color: '#6cd7ff', name: 'synthesize', title: '用印审批', access: true },
        { icon: 'logo-twitch', color: '#89d4af', name: 'rong-zi/rong-zi-shen-pi', title: '融资审批', access: true },
        // { icon: 'send', color: '#fa7c92', name: 'tabs/rong-zi', title: '融资管理', access: true },
        // tslint:disable-next-line:max-line-length
        // { icon: 'ios-chatbubbles', color: '#7dc6ff', name: 'zi-chan', title: '资产管理', url: '/work_dynamics/list', addUrl: 'exchange-add', isCanCommit: true, access: false },
        // { icon: 'md-radio', color: '#fb8862', name: 'decision-making-platform', title: '决策平台', access: false },
        // { icon: 'calendar', color: '#b2d76a', name: 'full-map', title: '项目分布', access: true },
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
        private logService: LogService
    ) {
        super(http, router, navController, dialogService);
    }
    /**
     * @description 小米推送注册后获取token
     */
    Your_Receive_Register_Function(data): void {
        // this.dialogService.alert(JSON.stringify(data));
        this.logService.add({
            regId: data.regId
        });
        // this.regid(data.regId, this.getMobileType());
        this.regid(data.regId, 'xiaomi');
    }
    /**
     * @description 小米推送接收推送消息
     */
    Your_Notification_Message_Arrived_Function(data): void {
        this.handleXiaoMi(data);
        const jsonData = JSON.stringify(data);
        this.logService.add({data: jsonData});
    }
    /**
     * @description 注册小米推送
     */
    registerMipush() {
        this.platform.ready().then(() => {
            if (this.platform.is('android')) {
                document.addEventListener('mipush.notificationMessageArrived', (data) => {
                    this.Your_Notification_Message_Arrived_Function(data);
                }, false);
                document.addEventListener('mipush.notificationMessageClicked', (data) => {
                    this.Your_Notification_Message_Arrived_Function(data);
                }, false);
                plugins.MiPushPlugin.init();
                document.addEventListener('mipush.receiveRegisterResult', (data) => {
                    this.Your_Receive_Register_Function(data);
                }, false);
            }
        });
    }
    /**
     * @description 初始化推送
     */
    private init(): void {
        this.platform.ready().then(() => {
            if (this.platform.is('android') || this.platform.is('ios')) {
                if (this.device.platform) {
                    if (this.isHuaWei() && Number(this.device.version) >= 7) {// 判断是否为华为手机并且安卓版本号大于等于7
                        this.huaWeiPushProvider.isConnected().then(() => {
                            this.huaWeiPushNotificationOpened();
                        }).catch(() => {
                            this.huaweiPush();
                        });
                    } else if (this.isXiaoMi()) {
                        this.registerMipush();
                    } else {
                        this.registerMipush();
                        // this.registerMipush();
                        // this.jPushModel.resumePush();
                        // this.jPushModel.setDebugMode(true);
                       //  this.jPushModel.init();
                       //  this.jPushModel.listenReceiveNotification();
                       //  this.jPushModel.getRegistrationID((token) => {
                       //      // this.dialogService.alert(token);
                       //      this.regid(token, this.getMobileType());
                       //      this.jPushModel.setAlias(this.jPushModel.getPersonAlias());
                       //      // this.jPushModel.listenOpenNotification();
                       //  });
                    }
                }
            }
        });
    }
    ngOnInit() {
        this.getHomeConfigData();
        this.getWeather();
        this.init();
        // 检查是否需要更新
        this.nativeService.detectionUpgrade();
        this.events.subscribe(AppConfig.Home.Badge, () => {
            this.getHomeConfigData();
            this.getWeather();
        });
    }
    /**
     * @description 获取天气情况
     */
    private getWeather(): void {
        $.get('https://restapi.amap.com/v3/weather/weatherInfo?key=771e4903465ad46e0d524d5190d148f1&city=%E8%B4%BE%E6%B1%AA', (res) => {
            console.log(res);
            this.weather = res.lives[0];
        });
    }
    /**
     * 获取当前时间是星期几
     */
     public getThisWeek(): string {
        const date = new Date();
        let week;
        // let arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
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

    setBadge(type: string, count: number) {
        const item = this.itemList.find(val => val.title === type)
        if (typeof item !== 'undefined') {
          item.badge = count
        }
    }

    setAccess(type: string, access: boolean) {
        const item = this.itemList.find(val => val.title === type)
        if (typeof item !== 'undefined') {
          item.access = access
        }
    }

    /**
     * @description 获取角标
     */
    getHomeConfigData() {
        this.request('/home/homeaccess', {}).then((res) => {
            const data = res.data;
            this.setAccess('收文系统', data['收文系统'])
            this.setAccess('发文系统', data['发文系统'])
            this.setAccess('交办督办', data['交办督办'])
            this.setAccess('请假管理', data['请假管理'])
            this.setAccess('加班管理', data['加班管理'])
            this.setAccess('外出管理', data['外出管理'])
            this.setAccess('用印审批', data['用印管理'])
            this.setAccess('融资审批', data['融资审批'])
        });
        this.request('/home/homecont', {}).then((res) => {
            this.setBadge('待办事项', Number(res.data.todocount))
            this.setBadge('待阅事项', Number(res.data.toreadcount))
            this.setBadge('收文系统', Number(res.data.receiptcount))
            this.setBadge('发文系统', Number(res.data.dispatchcount))
            this.setBadge('交办督办', Number(res.data['交办督办个数']))
            this.setBadge('请假管理', Number(res.data['请假管理个数']))
            this.setBadge('加班管理', Number(res.data['加班管理个数']))
            this.setBadge('外出管理', Number(res.data['外出管理个数']))
            this.setBadge('用印审批', Number(res.data['用印申请个数']))
            this.setBadge('融资审批', Number(res.data['融资审批个数']))
        }).catch((err) => {
            console.log(err);
        });
    }
    /**
     * 格式化当前时间
     */
    getThisDate() {
        const  d = new Date();
        const date = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        return `${year}年${this.addZero(month)}月${this.addZero(date)}`;
    }
    /**
     * @description 判断是否为华为手机
     */
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
    /**
     * @description 判断是否为小米手机
     */
    isXiaoMi() {
        if (this.platform.is('android')) {
            if (this.device.manufacturer) {
                return this.device.manufacturer.toLowerCase().indexOf('xiaomi') >= 0;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    /**
     * 获取手机型号
     */
    private getMobileType(): string {
        if (this.platform.is('android')) {
            if (this.device.manufacturer) {
                return this.device.manufacturer.toLowerCase();
            } else {
                return '';
            }
        } else {
            return '';
        }
    }
    private regid(regid: string, PushType: string): Promise<any> {
        return  this.request('/users/regid', {
            regid,
            PushType
        }).then((res) => {
            this.logService.add(res);
        });
    }
    // 加 0
    addZero(num) {
        let str = num + '';
        if (str.length <= 1) {
            str = '0' + str;
        }
        return str;
    }
    /**
     * 华为手机打开通知栏
     */
    huaWeiPushNotificationOpened() {
        document.addEventListener('huaweipush.notificationOpened', (event) => {
            this.handleHuaWei(event);
        }, false);
    }
    /**
     * 注册华为推送
     */
    huaweiPush() {
        this.huaWeiPushProvider.getDeviceToken().then((token) => {
            this.logService.add({
                type: 'huawei',
                token
            });
            this.regid(token, this.getMobileType());
            this.huaWeiPushProvider.connect();
            this.huaWeiPushProvider.isConnected().then((res) => {
                this.logService.add({type: 'huawei'});
            });
        });
        this.huaWeiPushProvider.init();
        document.addEventListener('huaweipush.notificationOpened', (event) => {
            this.handleHuaWei(event);
        }, false);
    }
    handleXiaoMi(json) {
        this.logService.add({
            data: 'xiaoMiPush_:' + JSON.stringify(json)
        });
        const extras = json.extra;
        const itemTitle = json.title; // temp.itemTitle;
        const contentTitle = json.description;
        const type = extras.type;
        const id = extras.id;
        this.logService.add({
            temp: JSON.stringify(extras)
        });
        this.jPushModel.pushNav(id, type, contentTitle, itemTitle);
    }
    handleHuaWei(json) {
        this.logService.add({
            huawei: JSON.stringify(json)
        });
        const extras = json.extras;
        const temp: any = {};
        for (const _item of extras) {
            for (const item in _item) {
                temp[item] = _item[item];
            }
        }
        const itemTitle = temp.itemTitle;
        const contentTitle = temp.contentTitle;
        const type = temp.type;
        const id = temp.relId;

        this.logService.add({
            huawei_temp: JSON.stringify(temp)
        });
        this.jPushModel.pushNav(id, type, contentTitle, itemTitle);
    }
}
