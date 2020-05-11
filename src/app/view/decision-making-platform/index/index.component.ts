import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Events, NavController} from '@ionic/angular';
import {DialogService} from '../../../service/dialog.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent extends BasePage implements OnInit {
  public itemList = [
    { icon: 'ios-briefcase', color: '#7dc6ff', name: 'decision-making-platform/hui-zong-tong-ji', title: '汇总统计' },
    { icon: 'ios-bookmarks', color: '#fb8862', name: 'decision-making-platform/dong-tai-zi-jin', title: '动态资金分析' },
    { icon: 'ios-create', color: '#b2d76a', name: 'decision-making-platform/cai-wu-zhi-fu', title: '财务支付统计' },
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
