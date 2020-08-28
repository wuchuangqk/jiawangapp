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
  selector: 'app-jun-gong-yan-shou-detail',
  templateUrl: './jun-gong-yan-shou-detail.component.html',
  styleUrls: ['./jun-gong-yan-shou-detail.component.scss'],
})
export class JunGongYanShouDetailComponent extends BasePage implements OnInit {

  public ysid = 0;
  public zhaoBiaoZhunBei: any = {};
  public kaiBiaoHou: any = {};

  // 招标准备
  public zhaoBiaoZhunBeiList: Array<IList> = [
    { label: '合同码', field:  'htcode' },
    { label: '合同名称', field:  'htname' },
    { label: '主持单位', field:  'zcdw' },
    { label: '参与单位', field:  'cydw' },
    { label: '验收组成员', field:  'ysuser' },
    { label: '竣工资料审查结论', field: 'yszljl'},
    { label: '竣工验收结论', field: 'ysjl'},
    { label: '存在问题', field: 'czwt'},
    { label: '验收日期', field: 'ystime'},
    // { label: '验收相关附件', field: 'fj'}
  ];

  // 验收相关附件
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
    this.ysid = this.query('ysid');
    this.title = this.query('name');
  }

  ngOnInit() {
    this.request('/project_details/fdysdetail', {
      ysid: this.ysid
    }).then((res) => {
      this.zhaoBiaoZhunBei = res.data;
      this.fjfile = res.data.fjfile;
    });
  }

}
