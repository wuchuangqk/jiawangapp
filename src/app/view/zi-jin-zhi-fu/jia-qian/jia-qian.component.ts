import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Events, NavController} from '@ionic/angular';
import {DialogService} from '../../../service/dialog.service';

@Component({
  selector: 'app-jia-qian',
  templateUrl: './jia-qian.component.html',
  styleUrls: ['./jia-qian.component.scss'],
})
export class JiaQianComponent extends BasePage implements OnInit {
  id = null;
  signtype = null;
  signerList = [];
  signer = [];

  constructor(
    public http: HttpService,
    public router: Router,
    public navController: NavController,
    public dialogService: DialogService,
    private events: Events,
    public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService);
    this.signtype = this.query('signtype');
    this.id = this.query('id')
  }

  ngOnInit() {
    this.getSigner();
  }

  getSigner() {
    this.request('/zhifu/getSignCreator', {signtype: this.signtype}).then(res => {
      this.signerList = res.data
    })
  }

  save() {
    console.log(this.signer);
    if (this.signer.length === 0) {
      this.dialogService.toast('请选择审批人');
      return
    }
    this.dialogService.loading('正在提交，请稍候……');
    this.setRequest('/zhifu/add_sign', {
      id: this.id,
      index: this.signtype,
      staff_ids: this.signer
    }).then(res => {
      this.dialogService.dismiss();
      this.dialogService.toast('提交成功');
      this.navController.back();
    })
  }
}
