import { Component, OnInit } from '@angular/core';
import {BasePage} from '../base/base-page';
import {HttpService} from '../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../service/dialog.service';
import {Events, NavController} from '@ionic/angular';

@Component({
  selector: 'app-zi-chan',
  templateUrl: './zi-chan.component.html',
  styleUrls: ['./zi-chan.component.scss'],
})
export class ZiChanComponent extends BasePage implements OnInit {

  public itemList = [
    // { icon: 'logo-twitch', color: '#6cd7ff', name: 'bao-xiao', title: '报销管理' },
    // { icon: 'ios-create', color: '#b2d76a', name: 'archive-management/00000000-0000-0000-0000-000000000000', title: '档案管理' },
    // { icon: 'ios-briefcase-outline', color: '#b6c3b9', name: '', title: '项目库' },
    // { icon: 'ios-create', color: '#b0b7bd', name: 'project-management', title: '项目管理' },
    // // { icon: 'ios-pricetags', color: '#89d4af', name: 'TouZiBaoBiaoPage', title: '投资报表'},
    // // { icon: 'md-calendar', color: '#afa9b3', name: 'JinDuBaoBiaoPage', title: '进度报表' },
    // // { icon: 'ios-calendar', color: '#75bcd8', name: '', title: '节点监控' },
    // { icon: 'md-radio', color: '#fb8862', name: 'decision-making-platform', title: '决策平台' },
    { icon: 'ios-school', color: '#babda7', name: 'zi-chan/wei-xiu', title: '资产维修审批' },
    { icon: 'md-trending-up', color: '#6dbbff', name: 'asset-statistics', title: '资产台账' },
    { icon: 'apps', color: '#6cd7ff', name: 'zi-chan/tu-di-guan-li', title: '土地管理' },
    { icon: 'home', color: '#afa9b3', name: 'zi-chan/fang-chan-guan-li', title: '房产管理' },
    { icon: 'business', color: '#fb8862', name: 'zi-chan/shang-pu-guan-li', title: '商铺管理' },
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
  ngOnInit() {}

}
