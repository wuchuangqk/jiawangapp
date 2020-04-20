import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../service/dialog.service';
import {Events, NavController} from '@ionic/angular';
import {BasePage} from '../../base/base-page';

@Component({
  selector: 'app-gong-cheng-bian-geng',
  templateUrl: './gong-cheng-bian-geng.component.html',
  styleUrls: ['./gong-cheng-bian-geng.component.scss'],
})
export class GongChengBianGengComponent extends BasePage implements OnInit {
  DataList: Array<any> = [];
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
    this.request('/project_details/bglist', {
      pid: this.pid
    }).then((res) => {
      this.DataList = res.data;
    });
  }
  getItem(item) {
    this.nav('project-detail/bian-geng-detail', {bgid: item.id});
  }

}
