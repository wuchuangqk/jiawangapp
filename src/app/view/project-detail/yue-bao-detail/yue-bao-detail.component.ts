import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import {Events, NavController} from '@ionic/angular';

@Component({
  selector: 'app-yue-bao-detail',
  templateUrl: './yue-bao-detail.component.html',
  styleUrls: ['./yue-bao-detail.component.scss'],
})
export class YueBaoDetailComponent extends BasePage implements OnInit {
  public ybid = 0;
  public zhaoBiaoZhunBei: any = {};

  public zhaoBiaoZhunBeiList = [
    { label: '时间', field:  'time' },
    { label: '累计完成投资', field:  'sjwctj' },
    { label: '本年累计完成投资', field:  'yearsjwctj' },
    { label: '计划进度内容', field:  'plancontext' },
    { label: '计划完成投资', field:  'planInvest' },
    { label: '进度内容', field:  'gContent' },
    { label: '存在问题', field:  'ReportProblem' },
    { label: '本月完成投资', field:  '_gInvest' },
    // { label: '相关附件', field:  'fj' },
  ];

  // 相关附件
  public fjfile :Array<IDownFile>= [];
  constructor(
      public http: HttpService,
      public router: Router,
      public dialogService: DialogService,
      public navController: NavController,
      public events: Events,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService, route);
    this.ybid = this.query('ybid');
    this.title = this.query('name');
  }

  ngOnInit() {
    this.request('/project_details//yuebaodetail', {
      ybid: this.ybid
    }).then((res) => {
      console.log(res);
      this.zhaoBiaoZhunBei = res.data;
      this.fjfile = res.data.fjfile;
    });
  }


}
