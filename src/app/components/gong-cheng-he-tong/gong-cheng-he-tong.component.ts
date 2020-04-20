import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../base/base-page';
import {HttpService} from '../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../service/dialog.service';
import {Events, NavController} from '@ionic/angular';

@Component({
  selector: 'app-gong-cheng-he-tong',
  templateUrl: './gong-cheng-he-tong.component.html',
  styleUrls: ['./gong-cheng-he-tong.component.scss'],
})
export class GongChengHeTongComponent extends BasePage implements OnInit {
  public DataList = [];
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
    this.request('/project_details/hetonglist', {
      pid: this.pid
    }).then((res) => {
      this.DataList = res.data;
    });
  }

  getItem(item) {
    this.nav('project-detail/he-tong-detail', {htid: item.id});
  }

}
