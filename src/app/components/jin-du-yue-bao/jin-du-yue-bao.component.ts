import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../base/base-page';
import {HttpService} from '../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../service/dialog.service';
import {Events, NavController} from '@ionic/angular';

@Component({
  selector: 'app-jin-du-yue-bao',
  templateUrl: './jin-du-yue-bao.component.html',
  styleUrls: ['./jin-du-yue-bao.component.scss'],
})
export class JinDuYueBaoComponent extends BasePage implements OnInit {
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
    this.request('/project_details/yuebaolist', {
      pid: this.pid
    }).then((res) => {
      this.DataList = res.data;
    });
  }

  getItem(item ) {
    this.nav('project-detail/yue-bao-detail', {ybid: item.id});
  }
}
