import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../base/base-page';
import {HttpService} from '../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../service/dialog.service';
import {Events, NavController} from '@ionic/angular';
interface IList {
  label: string;
  field: string;
}
@Component({
  selector: 'app-base-info',
  templateUrl: './base-info.component.html',
  styleUrls: ['./base-info.component.scss'],
})
export class BaseInfoComponent extends BasePage implements OnInit {
  public pid = 0;
  public info: any = {};
  public other: any = {};
  public unit: any = {};
  public baseInfoList: Array<IList> = [
    { label: '项目分类', field:  'projectType' },
    { label: '项目码'  , field:  'projectCode' },
    { label: '项目名称', field:  'projectName' },
    { label: '总投资'  , field:  'zongtouzi' },
    { label: '工程性质', field:  'projectxingzhi' },
    { label: '工程概算', field: 'projectGaiSuan'},
    { label: '建设阶段', field: 'buildStage'},
    { label: '资金来源', field: 'fundSources'},
    { label: '建设性质', field: 'buildxingzhi'},
    { label: '建设迄止年限', field: 'buildNianXian'},
    { label: '建筑面积', field: 'floorArea'},
    { label: '占地面积', field: 'coveringArea'},
    { label: '结构形式', field: 'buildLayout'},
    { label: '工程地址', field: 'projectAddress'},
    { label: '开工日期', field: 'kaiGongDate'},
    { label: '竣工日期', field: 'junGongDate'},
    { label: '建设规模', field: 'projectcontext'}
  ];
  public otherList: Array<IList> = [
    {label: '安全及质量目标', field: 'anquanzl'},
    {label: '立项批准文号', field: 'lxwh'},
    {label: '土地审批文号', field: 'tdsp'},
    {label: '环评审批文号', field:  'hpsp'},
    {label: '建设用地规划审批文号', field: 'ydgh'},
    {label: '建设工程规划审批文号', field: 'gcgh'},
    {label: '施工许可号', field: 'sgxh'},
    {label: '备注', field: 'remarks'},
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
    this.pid = this.query('pid');
    this.title = this.query('name');
  }


  ngOnInit() {
    this.getDataList();
  }
  getDataList() {
    this.request(`/projects/info/${this.pid}`, {
    }).then((res) => {
      this.info = res.data.info;
      this.other = res.data.other;
      this.unit = res.data.unit;
    });
  }

}
