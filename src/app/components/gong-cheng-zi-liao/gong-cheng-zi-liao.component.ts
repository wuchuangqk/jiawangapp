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
  // 可预览的附件
  public canViewFileList = [];

  // 不可预览的附件
  public cannotViewFileList = [];
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
        this.canViewFileList = [];
      this.canViewFileList = res.data.files;
      this.cannotViewFileList = res.data.result
    });
  }
  // 通过浏览器打开
  openByBrowser(item: IDownFile){
    location.href = item.fileurl;
  }

}
