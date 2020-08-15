import { Component } from '@angular/core';
import {BasePage} from '../base/base-page';
import {HttpService} from '../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../service/dialog.service';
import {Events, NavController} from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'project-page.component.html',
  styleUrls: ['project-page.component.scss']
})
export class ProjectPage extends  BasePage {


  public itemList = [
    // { icon: 'ios-notifications', color: '#7dc6ff', name: 'notice',
    //   title: '通知公告', url: '/notices/list', bage: '' , addUrl: 'add', isCanCommit: false },
    // { icon: 'ios-bookmarks', color: '#7dc6ff', name: 'work-diary', title: '工作日志' , url: '/work_logs/list'},
    // { icon: 'megaphone', color: '#6cd7ff', name: 'work-plan', title: '工作计划', url: '/workplan/list' },
    // { icon: 'ios-paper', color: '#73d1d1', name: 'receive-document', title: '收文系统' },
    // { icon: 'send', color: '#fa7c92', name: 'send-document', title: '发文系统' },
    // { icon: 'ios-chatbubbles', color: '#7dc6ff', name: 'work-dynamics',
    //   title: '工作交流', url: '/work_dynamics/list', addUrl: 'exchange-add', isCanCommit: true },
    // { icon: 'ios-people', color: '#fbbd6d', name: 'assign', title: '交办督办督查' },
    // { icon: 'calendar', color: '#b2d76a', name: 'leave', title: '请假管理' },
    // { icon: 'ios-alarm', color: '#c1a6f0', name: 'overtime-work', title: '加班管理' },
    // { icon: 'md-pin', color: '#a3bdb9', name: 'go-out', title: '外出管理' },
    // { icon: 'logo-twitch', color: '#6cd7ff', name: 'synthesize', title: '综合管理' },
    // { icon: 'ios-folder', color: '#6cd7ff', name: 'property', title: '资产购置' },
    // { icon: 'ios-folder', color: '#6cd7ff', name: 'finance-detail', title: '资产明细' },
    // { icon: 'megaphone', color: '#6cd7ff', name: 'cultural-propaganda', title: '党建园地', url: '/notices/wenxuan_list' },
    // { icon: 'logo-twitch', color: '#6cd7ff', name: 'bao-xiao', title: '报销管理' },
    // { icon: 'ios-create', color: '#b2d76a', name: 'archive-management/00000000-0000-0000-0000-000000000000', title: '档案管理' },
    { icon: 'ios-briefcase', color: '#7dc6ff', name: 'project/my-project', title: '我的项目', access: true },
    { icon: 'ios-bookmarks', color: '#fb8862', name: 'project-management', title: '项目管理', access: true },
    { icon: 'ios-create', color: '#b2d76a', name: 'project/xiang-mu-jin-du', title: '项目进度', access: true },
    // { icon: 'ios-pricetags', color: '#89d4af', name: 'TouZiBaoBiaoPage', title: '工程审批'},
    { icon: 'ios-pricetags', color: '#f9a970', name: 'project/my-shen-pi-list', title: '我的审批', access: true },
    { icon: 'md-radio', color: '#fb8862', name: 'decision-making-platform', title: '决策平台', access: true },
    { icon: 'calendar', color: '#b2d76a', name: 'full-map', title: '项目分布', access: true },
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

    this.request('/home/homeaccess', {}).then((res) => {
      const data = res.data;
      // this.itemList[4].access = data.rz;
      this.itemList[4].access = data.zc;
      // this.itemList[6].access = data.jc;
    });
  }

}
