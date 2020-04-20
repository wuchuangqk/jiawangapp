import { Component, OnInit } from '@angular/core';
import {DetailBasePage} from '../../../base/detail-base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Events} from '@ionic/angular';
import {AppConfig} from '../../../app.config';
import { NavController } from '@ionic/angular';
import {BasePage} from '../../../base/base-page';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent  extends BasePage implements OnInit {
  public title = '详情';
  public content: SafeHtml;
  public id = '';
  public payload: {
    document_type: string
  };
  public detail = {};

  public heTong = {};
  public htid = 0;

  // 招标准备
  public zhaoBiaoZhunBeiList = [
    { label: '贷款单编号', field:  'dkdbhs' },
    { label: '债务名称', field: 'zwmc'},
    { label: '计划还款日期', field: 'jhhkrq'},
    { label: '贷款总额', field: 'dkzy'},
    { label: '利率(%)', field: 'lilv'},
    { label: '本金', field: 'benjin'},
    { label: '预估利息', field: 'ykls'},
    { label: '实还日期', field: 'shrq'},
    // { label: '工程变更审核价', field: 'danwei'},
    { label: '还款本金', field: 'hkbj'},
    { label: '实际还款利息', field: 'sjhkls'},
    // { label: '合同附件', field: 'fj'},
    { label: '滞纳金', field: 'znj'},
    { label: '还款公司', field: 'hkcompany'},
    { label: '还款凭证号', field: 'hkpz'},
    { label: '未还款本金', field: 'whkbj'},
    { label: '是否提前结清', field: 'isok'}
  ];
  constructor(
      public http: HttpService,
      public router: Router,
      public navController: NavController,
      public dialogService: DialogService,
      public sanitizer: DomSanitizer,
      public events: Events,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService, route);
    this.id = this.query('id');
  }

  ngOnInit() {
    this.getDetail();
  }
  public getDetail() {
    this.request('/rongzi/warmdetail', {
      id: this.id
    }).then((res) => {
      this.detail = res.data;
    });
  }
}
