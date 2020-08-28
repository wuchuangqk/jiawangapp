import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import {Events, NavController} from '@ionic/angular';

interface IList {
  label: string;
  field: string;
}
@Component({
  selector: 'app-zhao-biao-detail',
  templateUrl: './zhao-biao-detail.component.html',
  styleUrls: ['./zhao-biao-detail.component.scss'],
})
export class ZhaoBiaoDetailComponent extends BasePage implements OnInit {
  public zbid = 0;
  public zhaoBiaoZhunBei: any = {};
  public kaiBiaoHou: any = {};

  // 招标准备
  public zhaoBiaoZhunBeiList: Array<IList> = [
    // { label: '项目分类', field:  'projectType' },
    { label: '招标码', field: 'code'},
    { label: '发包方式', field: 'fbfs'},
    { label: '办理类型', field: 'bllx'},
    { label: '招标标底', field: 'biaodi'},
    { label: '发包人', field: 'fbr'},
    { label: '发布日期', field: 'fbtime'},
    { label: '开标日期', field: 'kbtime'},
    { label: '招标代理单位', field: 'danwei'},
    // { label: '招标审批稿', field: 'fj'},
  ];
   public KaiBiaoHouList: Array<IList> = [
     { label: '中标价', field:  'zbjia' },
     { label: '中标人', field:  'zbren' },
     // { label: '过程材料', field:  'sf' },
   ];
   // 招标审批稿
  public fjfile:Array<IDownFile>=[];

  // 过程材料
  public sffile:Array<IDownFile>=[];
  constructor(
    public http: HttpService,
    public router: Router,
    public navController: NavController,
    public dialogService: DialogService,
    public events: Events,
    public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService, route);
    this.zbid = this.query('zbid');
    this.title = this.query('name');
  }

  ngOnInit() {
    this.request('/project_details/zbdetail', {
      zbid: this.zbid
    }).then((res) => {
      this.zhaoBiaoZhunBei = res.data.qq;
      this.kaiBiaoHou = res.data.hh;
      this.fjfile = res.data.qq.fjfile;
      this.sffile = res.data.hh.sffile;
    });
  }

}
