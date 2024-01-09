import {Component, OnInit} from '@angular/core';
import {BasePage} from '../base/base-page';
import {HttpService} from '../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../service/dialog.service';
import {Events, NavController} from '@ionic/angular';
import { AppConfig} from '../app.config';

@Component({
  selector: 'app-tab2',
  templateUrl: 'office-tab-page.component.html',
  styleUrls: ['office-tab-page.component.scss']
})
export class OfficeTabPage extends BasePage implements OnInit {

  public itemList: Array<any> = [
    { icon: 'ios-notifications', color: '#7dc6ff', name: 'notice',
      title: '通知公告', url: '/notices/list', bage: '' , addUrl: 'add', isCanCommit: false, access: true },
    { icon: 'ios-bookmarks', color: '#7dc6ff', name: 'work-diary', title: '工作日志' , url: '/work_logs/list', access: true},
    // { icon: 'megaphone', color: '#6cd7ff', name: 'work-plan', title: '工作计划', url: '/workplan/list' },
    { icon: 'ios-paper', color: '#73d1d1', name: 'receive-document', title: '收文系统', access: true },
    { icon: 'send', color: '#fa7c92', name: 'send-document', title: '发文系统', access: true },
    { icon: 'ios-chatbubbles', color: '#7dc6ff', name: 'work-dynamics',
      title: '工作交流', url: '/work_dynamics/list', addUrl: 'exchange-add', isCanCommit: true, access: true },
    { icon: 'ios-people', color: '#fbbd6d', name: 'assign', title: '交办督办', access: true },
    { icon: 'calendar', color: '#b2d76a', name: 'leave', title: '请假管理', access: true },
    { icon: 'ios-alarm', color: '#c1a6f0', name: 'overtime-work', title: '加班管理', access: true },
    { icon: 'md-pin', color: '#a3bdb9', name: 'go-out', title: '外出管理', access: true },
    { icon: 'logo-twitch', color: '#6cd7ff', name: 'synthesize', title: '用印审批', access: true },
    { icon: 'ios-folder', color: '#6cd7ff', name: 'property', title: '资产购置', access: true },
    { icon: 'ios-folder', color: '#6cd7ff', name: 'he-tong-shen-cha', title: '合同审查', access: true },
    { icon: 'list-box', color: '#c1a6f0', name: 'zi-jin-zhi-fu', title: '资金支付', access: true },
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
      this.events.subscribe(AppConfig.Home.Badge, () => {
          this.getHomeConfigData();
      });
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
  });
    this.request('/home/homecont', {}).then((res) => {
      this.setBadge('通知公告', Number(res.data.noticecontent))
      this.setBadge('收文系统', Number(res.data.receiptcount))
      this.setBadge('发文系统', Number(res.data.dispatchcount))
      this.setBadge('工作交流', Number(res.data.workcount))
      this.setBadge('交办督办', Number(res.data['交办督办个数']))
      this.setBadge('请假管理', Number(res.data['请假管理个数']))
      this.setBadge('加班管理', Number(res.data['加班管理个数']))
      this.setBadge('外出管理', Number(res.data['外出管理个数']))
      this.setBadge('用印审批', Number(res.data['用印申请个数']))
    }).catch((err) => {
      console.log(err);
    });
  }
  doRefresh(event) {
    super.doRefresh(event);
    this.getHomeConfigData();
  }
}
