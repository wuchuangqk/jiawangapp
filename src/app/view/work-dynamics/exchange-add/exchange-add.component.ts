import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Events, NavController} from '@ionic/angular';
import {DialogService} from '../../../service/dialog.service';
import {AppConfig} from '../../../app.config';

@Component({
  selector: 'app-exchange-add',
  templateUrl: './exchange-add.component.html',
  styleUrls: ['./exchange-add.component.scss'],
})
export class ExchangeAddComponent extends BasePage implements OnInit {
  public params = {
    // 标题
    infoTitle: '',
    // 用途
    infoUse: '',
    // 分类
    infoType: '',
    // 内容
    infoContent: '',
    roleType: 1,
    ids: ''
  };
    public fileArray = [];
 public keshiIds = [];
  public selectedStaff = [];
  public InfoUseList = [];
  public InfoTypeList = [];
  public keShiList = [];
  public rolesList = [
      {value: 1, label: '全部' },
      {value: 2, label: '科室' },
      {value: 3, label: '个人' },
      {value: 4, label: '私人' }
  ];
  constructor(
      public http: HttpService,
      public router: Router,
      public navController: NavController,
      public dialogService: DialogService,
      public event: Events,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService);
  }

  ngOnInit() {
    this.GetInfoType();
    this.GetInfoUse();
    this.GetDartName();
  }
  // 用途
  private async GetInfoUse() {
    const res =  await this.request('/work_dynamics/GetInfoUse', {});
    this.InfoUseList = res.data;
  }
  go(eventName) {
    localStorage.num = 0;
    this.nav('/receive-document/staff-select/0000', {
      title: '选择人员', url: 'bbb', depart_id: '0000',
      isSelectOne: false,
      eventName,
      selected_staff : JSON.stringify(this.selectedStaff),
      selectedStaff : JSON.stringify(this.selectedStaff)
    });
  }
  private async GetDartName() {
    const res = await this.request('/work_dynamics/GetDartName', {});
    this.keShiList = res.data;
  }
  private async GetInfoType() {
    const res = await this.request('/work_dynamics/GetInfoType', {});
    this.InfoTypeList = res.data;
  }
  private checkParams(): boolean {
    if (!this.params.infoTitle) {
      this.dialogService.toast('请输入标题！');
      return false;
    } else if (!this.params.infoContent) {
      this.dialogService.toast('请输入内容');
      return false;
    }
    return true;
  }
    getFileArray(fileArray) {
        this.fileArray = fileArray;
    }
    public async submit() {
      this.params.ids = '';
      if (this.params.roleType === 2) {
      this.params.ids = this.keshiIds.join(',');
    } else if (this.params.roleType === 3) {
          const idsArr = [];
          for (const item of this.selectedStaff) {
            idsArr.push(item.id);
          }
          this.params.ids = idsArr.join(',');
    } else {
          this.params.ids = '';
      }
      if (!this.checkParams()) {
      return;
    }
      // 如果选择科室
      this.dialogService.loading('正在提交，请稍后！');
      await this.uploadFiles('/work_dynamics/add', this.params, this.fileArray);
      this.dialogService.dismiss();
      this.dialogService.alert('提交成功！', () => {
            this.event.publish(AppConfig.Notice.List);
            this.navController.back();
        });
  }
}
