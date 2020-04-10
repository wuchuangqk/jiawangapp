import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../base/base-page';
import {HttpService} from '../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../service/dialog.service';
import {Events, NavController} from '@ionic/angular';

interface IZhaoBiao {
  id: number;
  title: string;
  code: string;
  bidder: string;
  price: number;
  fbfs: string;
}


@Component({
  selector: 'app-gong-cheng-zhao-biao',
  templateUrl: './gong-cheng-zhao-biao.component.html',
  styleUrls: ['./gong-cheng-zhao-biao.component.scss'],
})
export class GongChengZhaoBiaoComponent extends BasePage implements OnInit {
  DataList: Array<IZhaoBiao> = [];
  public pid = 0;
  constructor(
      public http: HttpService,
      public router: Router,
      public dialogService: DialogService,
      public navController: NavController,
      public events: Events,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService, route);
    this.pid = this.query('pid');
    this.title = this.query('name');
  }
  ngOnInit() {
    this.request('/project_details/zhaobiaolist', {
      pid: this.pid
    }).then((res) => {
      this.DataList = res.data;
    });
  }
  getItem(item: IZhaoBiao) {
    this.nav('project-detail/zhao-biao-detail', {zbid: item.id});
  }

}
