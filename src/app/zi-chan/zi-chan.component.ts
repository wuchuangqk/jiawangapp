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
    { icon: 'apps', color: '#6cd7ff', name: 'zi-chan/tu-di-guan-li', title: '土地管理' },
    { icon: 'home', color: '#afa9b3', name: 'zi-chan/fang-chan-guan-li', title: '房产管理' },
    { icon: 'business', color: '#fb8862', name: 'zi-chan/shang-pu-guan-li', title: '商铺管理' },
    { icon: 'md-trending-up', color: '#6dbbff', name: 'asset-statistics', title: '资产台账' },
    { icon: 'build', color: '#babda7', name: 'zi-chan/wei-xiu', title: '资产维修审批' },
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
