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
  };
  public InfoUseList = [];
  public InfoTypeList = [];
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
  }
  // 用途
  private GetInfoUse() {
    this.request('/work_dynamics/GetInfoUse', {}).then((res) => {
      this.InfoUseList = res.data;
    });
  }
  private GetInfoType() {
    this.request('/work_dynamics/GetInfoType', {}).then((res) => {
      this.InfoTypeList = res.data;
    });
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
  public submit() {
    if (!this.checkParams()) {
      return;
    }
    this.dialogService.loading('正在提交，请稍后！');
    this.setRequest('/work_dynamics/add', this.params).then((res) => {
      this.dialogService.dismiss();
      this.dialogService.alert('提交成功！', () => {
        this.event.publish(AppConfig.Notice.List);
        this.navController.back();
      });
    });
  }
}
