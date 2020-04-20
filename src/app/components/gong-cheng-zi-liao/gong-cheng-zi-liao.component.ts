import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../base/base-page';
import {HttpService} from '../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../service/dialog.service';
import {Events, NavController} from '@ionic/angular';

@Component({
  selector: 'app-gong-cheng-zi-liao',
  templateUrl: './gong-cheng-zi-liao.component.html',
  styleUrls: ['./gong-cheng-zi-liao.component.scss'],
})
export class GongChengZiLiaoComponent extends BasePage implements OnInit {

  DataList = [];
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
    this.request('/project_details/breiflist', {
      pid: this.pid
    }).then((res) => {
      this.DataList = res.data;
    });
  }
  getItem(item) {
    // this.nav('project-detail/jun-gong-yan-shou-detail', {ysid: item.id});
      console.log(item);
      location.href = item.fileurl;
  }


}
