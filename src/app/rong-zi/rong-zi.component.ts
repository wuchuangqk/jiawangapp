import { Component, OnInit } from '@angular/core';
import {BasePage} from '../base/base-page';
import {HttpService} from '../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../service/dialog.service';
import {Events, NavController} from '@ionic/angular';

@Component({
  selector: 'app-rong-zi',
  templateUrl: './rong-zi.component.html',
  styleUrls: ['./rong-zi.component.scss'],
})
export class RongZiComponent extends BasePage implements OnInit {

  public itemList = [
    // { icon: 'logo-twitch', color: '#6cd7ff', name: 'bao-xiao', title: '报销管理' },
    // { icon: 'ios-create', color: '#b2d76a', name: 'archive-management/00000000-0000-0000-0000-000000000000', title: '档案管理' },
    // { icon: 'ios-briefcase-outline', color: '#b6c3b9', name: '', title: '项目库' },
    // { icon: 'ios-create', color: '#b0b7bd', name: 'project-management', title: '项目管理' },
    // // { icon: 'ios-pricetags', color: '#89d4af', name: 'TouZiBaoBiaoPage', title: '投资报表'},
    // // { icon: 'md-calendar', color: '#afa9b3', name: 'JinDuBaoBiaoPage', title: '进度报表' },
    // // { icon: 'ios-calendar', color: '#75bcd8', name: '', title: '节点监控' },
    // { icon: 'md-radio', color: '#fb8862', name: 'decision-making-platform', title: '决策平台' },
    // // { icon: 'ios-school', color: '#babda7', name: 'GongChengShenPiPage', title: '工程相关管理' },
    { icon: 'md-trending-up', color: '#6dbbff', name: 'rong-zi/tai-zhang', title: '融资台账' },
    { icon: 'logo-usd', color: '#f9a970', name: 'finance-reimbursement', title: '还款预警' },
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

}
