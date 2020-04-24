import {Component, OnInit} from '@angular/core';
import {BasePage} from '../base/base-page';
import {HttpService} from '../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../service/dialog.service';
import {Events, NavController} from '@ionic/angular';

@Component({
  selector: 'app-home-tab',
  templateUrl: 'home-tab.component.html',
  styleUrls: ['home-tab.component.scss']
})
export class HomeTabComponent  extends BasePage implements OnInit{
  public ziChanAndHeTongCount = {};
  public  itemList: Array<any> = [
    { icon: 'ios-notifications', color: '#7dc6ff', name: 'notice', title: '通知公告', url: '/notices/list', bage: '' , addUrl: 'add', isCanCommit: false },
    { icon: 'ios-bookmarks', color: '#7dc6ff', name: 'work-diary', title: '工作日志' , url: '/work_logs/list'},
    { icon: 'ios-paper', color: '#73d1d1', name: 'dai-ban', title: '待办事项' },
    { icon: 'ios-paper', color: '#73d1d1', name: 'dai-yue', title: '待阅事项' },
    { icon: 'send', color: '#fa7c92', name: 'rong-zi', title: '融资管理' },
    { icon: 'ios-chatbubbles', color: '#7dc6ff', name: 'zi-chan', title: '资产管理', url: '/work_dynamics/list', addUrl: 'exchange-add', isCanCommit: true },
    // { icon: 'ios-people', color: '#fbbd6d', name: 'assign', title: '决策平台' },
    { icon: 'md-radio', color: '#fb8862', name: 'decision-making-platform', title: '决策平台' },
    { icon: 'calendar', color: '#b2d76a', name: 'full-map', title: '项目分布' },
  ];
  constructor(
      public http: HttpService,
      public router: Router,
      public dialogService: DialogService,
      public events: Events,
      public navController: NavController,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService);
  }
  ngOnInit() {
    // super.ngOnInit();
      this.getHomeConfigData();
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

  getHomeConfigData() {
    this.request('/users/home_configure', {}).then((res) => {
      this.itemList[0].bage = Number(res.data.tzgg);  //  通知公告
      this.itemList[1].bage = Number(res.data.gzrz);  //  工作日志(该项没有推送)
      this.itemList[2].bage = Number(res.data.sw);    //  收文系统
      this.itemList[3].bage = Number(res.data.fw);    //  发文系统
      this.itemList[4].bage = Number(res.data.gzdt);  //  工作交流
      this.itemList[6].bage = Number(res.data.jbdb);  //  交办督办
      this.itemList[7].bage = Number(res.data.qjsp);  //  请假管理
      this.itemList[8].bage = Number(res.data.jbsp);  //  加班管理
      this.itemList[9].bage = Number(res.data.wcsp);  //  外出管理
      this.itemList[10].bage = Number(res.data.zhsp);  //  综合管理
      // this.itemList[10].bage = Number(res.data.zcgz); //  资产购置
      // this.itemList[11].bage = Number(res.data.whxc); //  文化宣传
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
  addZero(num) {
    let str = num + '';
    if (str.length <= 1) {
      str = '0' + str;
    }
    return str;
  }
  getZiChanAndHeTongCount() {
    this.ziChanAndHeTongCount = {};
  }

}
