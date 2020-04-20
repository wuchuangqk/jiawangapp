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
  selector: 'app-he-tong-detail',
  templateUrl: './he-tong-detail.component.html',
  styleUrls: ['./he-tong-detail.component.scss'],
})
export class HeTongDetailComponent extends  BasePage implements OnInit {
  public heTong = {};
  public htid = 0;

  // 招标准备
  public zhaoBiaoZhunBeiList: Array<IList> = [
    { label: '项目名称', field:  'projectname' },
    { label: '合同名称', field: 'htname'},
    { label: '发包人(甲方)', field: 'fbren'},
    { label: '承包人（乙方）', field: 'chengbren'},
    { label: '承包人资质', field: 'chengbrenzz'},
    { label: '拟排项目经理', field: 'xmjl'},
    { label: '项目经理资质', field: 'xmjlzz'},
    { label: '合同价格', field: 'htj'},
    // { label: '工程变更审核价', field: 'danwei'},
    { label: '合同决算', field: 'htjs'},
    { label: '合同支付金额', field: 'htzf'},
    // { label: '合同附件', field: 'fj'},
    { label: '合同内容', field: 'htcontent'},
    { label: '合同签订日期', field: 'qdtime'},
    { label: '合同迄止日期', field: 'htse'},
    { label: '添加人', field: 'addren'},
    { label: '添加时间', field: 'addtime'},
    { label: '备注', field: 'remark'},
    { label: '合同审批附件列表', field: 'spfj'},
    { label: '合同正式稿', field: 'zsgao'},
    { label: '合同过程稿附件', field: 'guofj'},
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
    this.htid = this.query('htid');
    this.title = this.query('name');
  }

  ngOnInit() {
    this.request('/project_details/hetongdetail', {
      htid: this.htid
    }).then((res) => {
      this.heTong = res.data;
    });
  }

}
