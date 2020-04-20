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
  selector: 'app-bian-geng-detail',
  templateUrl: './bian-geng-detail.component.html',
  styleUrls: ['./bian-geng-detail.component.scss'],
})
export class BianGengDetailComponent extends BasePage implements OnInit {


  public heTong = {};
  public bgid = 0;

  // 招标准备
  public zhaoBiaoZhunBeiList: Array<IList> = [
    { label: '变更码', field:  'bgm' },
    { label: '变更情况', field:  'isty' },
    { label: '变更内容及事由', field:  'context1' },
    { label: '估价', field:  'gujia' },
    { label: '申请审批批准时间', field:  'sqsptime' },
    { label: '变更内容完成时间', field:  'bgwctime' },
    { label: '施工单位上报时间', field:  'sgdwtime' },
    { label: '变更内容及事由', field:  'bgcontext' },
    { label: '审核价', field:  'shj' },
    { label: '备注', field:  'remarks' },
    { label: '变更相关附件', field:  'fj' },
  ];

  constructor(
      public http: HttpService,
      public router: Router,
      public dialogService: DialogService,
      public navController: NavController,
      public events: Events,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService, route);
    this.bgid = this.query('bgid');
    this.title = this.query('name');
  }

  ngOnInit() {
    this.request('/project_details/bgdetail', {
      bgid: this.bgid
    }).then((res) => {
      this.heTong = res.data;
    });
  }

}
