import {Component, OnInit} from '@angular/core';
import {BasePage} from '../base/base-page';
import {HttpService} from '../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../service/dialog.service';
import {Events, NavController} from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'office-tab-page.component.html',
  styleUrls: ['office-tab-page.component.scss']
})
export class OfficeTabPage extends BasePage implements OnInit {

  public itemList: Array<any> = [
    { icon: 'ios-notifications', color: '#7dc6ff', name: 'notice',
      title: '通知公告', url: '/notices/list', bage: '' , addUrl: 'add', isCanCommit: false },
    { icon: 'ios-bookmarks', color: '#7dc6ff', name: 'work-diary', title: '工作日志' , url: '/work_logs/list'},
    // { icon: 'megaphone', color: '#6cd7ff', name: 'work-plan', title: '工作计划', url: '/workplan/list' },
    { icon: 'ios-paper', color: '#73d1d1', name: 'receive-document', title: '收文系统' },
    { icon: 'send', color: '#fa7c92', name: 'send-document', title: '发文系统' },
    { icon: 'ios-chatbubbles', color: '#7dc6ff', name: 'work-dynamics',
      title: '工作交流', url: '/work_dynamics/list', addUrl: 'exchange-add', isCanCommit: true },
    { icon: 'ios-people', color: '#fbbd6d', name: 'assign', title: '交办督办' },
    { icon: 'calendar', color: '#b2d76a', name: 'leave', title: '请假管理' },
    { icon: 'ios-alarm', color: '#c1a6f0', name: 'overtime-work', title: '加班管理' },
    { icon: 'md-pin', color: '#a3bdb9', name: 'go-out', title: '外出管理' },
    { icon: 'logo-twitch', color: '#6cd7ff', name: 'synthesize', title: '综合管理' },
    { icon: 'ios-folder', color: '#6cd7ff', name: 'property', title: '资产购置' },
    { icon: 'ios-folder', color: '#6cd7ff', name: 'he-tong-shen-cha', title: '合同审查' },
    // { icon: 'ios-folder', color: '#6cd7ff', name: 'finance-detail', title: '资产明细' },
    // { icon: 'megaphone', color: '#6cd7ff', name: 'cultural-propaganda', title: '党建园地', url: '/notices/wenxuan_list' },
    // { icon: 'logo-twitch', color: '#6cd7ff', name: 'bao-xiao', title: '报销管理' },
    // { icon: 'ios-create', color: '#b2d76a', name: 'archive-management/00000000-0000-0000-0000-000000000000', title: '档案管理' },
    // { icon: 'ios-briefcase-outline', color: '#b6c3b9', name: '', title: '项目库' },
    // { icon: 'ios-create', color: '#b0b7bd', name: 'project-management', title: '项目管理' },
    // // { icon: 'ios-pricetags', color: '#89d4af', name: 'TouZiBaoBiaoPage', title: '投资报表'},
    // // { icon: 'md-calendar', color: '#afa9b3', name: 'JinDuBaoBiaoPage', title: '进度报表' },
    // // { icon: 'ios-calendar', color: '#75bcd8', name: '', title: '节点监控' },
    // { icon: 'md-radio', color: '#fb8862', name: 'decision-making-platform', title: '决策平台' },
    // // { icon: 'ios-school', color: '#babda7', name: 'GongChengShenPiPage', title: '工程相关管理' },
    // { icon: 'md-trending-up', color: '#6dbbff', name: 'asset-statistics', title: '资产统计' },
    // { icon: 'logo-usd', color: '#f9a970', name: 'finance-reimbursement', title: '融资还款' },
    // { icon: 'ios-pin', color: '#94aac1', name: 'full-map', title: '全景地图' },
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
      this.getHomeConfigData()
  }

  getHomeConfigData() {
    this.request('/home/homecont', {}).then((res) => {
      this.itemList[0].badge = Number(res.data.noticecontent);  //  通知公告
      this.itemList[1].badge = Number(res.data.gzrz);  //  工作日志(该项没有推送)
      this.itemList[2].badge = Number(res.data.receiptcount);    //  收文系统
      this.itemList[3].badge = Number(res.data.dispatchcount);    //  发文系统
      this.itemList[4].badge = Number(res.data.workcount);  //  工作交流
      this.itemList[6].badge = Number(res.data.jbdb);  //  交办督办
      this.itemList[7].badge = Number(res.data.qjsp);  //  请假管理
      this.itemList[8].badge = Number(res.data.jbsp);  //  加班管理
      this.itemList[9].badge = Number(res.data.wcsp);  //  外出管理
      this.itemList[10].bdage = Number(res.data.zhsp);  //  综合管理
      // this.itemList[10].bage = Number(res.data.zcgz); //  资产购置
      // this.itemList[11].bage = Number(res.data.whxc); //  文化宣传
    }).catch((err) => {
      console.log(err);
    });
  }
  doRefresh(event) {
    super.doRefresh(event);
    this.getHomeConfigData();
  }
}
