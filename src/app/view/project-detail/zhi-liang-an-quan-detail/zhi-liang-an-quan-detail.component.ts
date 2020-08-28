import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../../service/http.service';
import {DialogService} from '../../../service/dialog.service';
import {Events, NavController} from '@ionic/angular';

interface IList {
  label: string;
  field: string;
}
@Component({
  selector: 'app-zhi-liang-an-quan-detail',
  templateUrl: './zhi-liang-an-quan-detail.component.html',
  styleUrls: ['./zhi-liang-an-quan-detail.component.scss'],
})
export class ZhiLiangAnQuanDetailComponent extends BasePage implements OnInit {

  public zlid = 0;
  public zhaoBiaoZhunBei: any = {};
  public kaiBiaoHou: any = {};

  // 招标准备
  public zhaoBiaoZhunBeiList: Array<IList> = [
    { label: '合同码', field:  'code' },
    { label: '发生时间', field: 'fstime'},
    { label: '信息来源', field: 'infor'},
    { label: '情况描述', field: 'zcontext'},
    { label: '是否处理', field: 'iscl'},
    { label: '处理时间', field: 'cltime'},
    { label: '责任单位', field: 'zrdanwei'},
    { label: '处理结果', field: 'jg'},
    { label: '附件', field: 'fj'}
  ];

  // 附件
  public fjfile :Array<IDownFile>= [];

  // // 过程材料
  // public sffile :Array<IDownFile>= [];
  constructor(
      public http: HttpService,
      public router: Router,
      public dialogService: DialogService,
      public navController: NavController,
      public events: Events,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService, route);
    this.zlid = this.query('zlid');
    this.title = this.query('name');
  }

  ngOnInit() {
    this.request('/project_details/zlsafedetail', {
      zlid: this.zlid
    }).then((res) => {
      this.zhaoBiaoZhunBei = res.data;
      this.fjfile = res.data.fjfile;
    });
  }



}
