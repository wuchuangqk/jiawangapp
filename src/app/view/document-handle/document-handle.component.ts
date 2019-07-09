import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../base/base-page';
import {HttpService} from '../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../service/dialog.service';
import {Events, NavController} from '@ionic/angular';
import {AppConfig} from '../../app.config';

@Component({
  selector: 'app-document-handle',
  templateUrl: './document-handle.component.html',
  styleUrls: ['./document-handle.component.scss'],
})
export class DocumentHandleComponent extends BasePage implements OnInit {
  payload = {
    morning: ''
  };
  documentType: string;
  id: string;
  selectedStaff = [];
  constructor(
      public http: HttpService,
      public router: Router,
      public dialogService: DialogService,
      public events: Events,
      public navController: NavController,
      public route?: ActivatedRoute,
  ) {
    super(http, router, dialogService);
    this.title = this.query('title');
    this.id = this.query('id');
  }

  ngOnInit() {
  }


  save(opinion: string) {
    // return;
    // if (this.isEmpty(opinion)) {
    //   this._dialog.presentToast('请填写意见');
    //   return;
    // }

    let ids = '';
    // if (this.documentType == '1') {//发文保存需要判断是否选人
    //   //发文最后一个人才需要判断是否选人
    //   if (this.documentDetail.last == '1' && this.contactView.selectedStaff.length == 0) {
    //     this._dialog.presentToast('请添加名单后继续');
    //     return;
    //   }
    // }

    const size = this.selectedStaff.length;
    this.selectedStaff.forEach((value, index, array) => {
      ids += value.id;
      if (index < size - 1) {
        ids += ',';
      }
    });
    this.dialogService.toast('正在提交数据...');
    const params = new Map<string, string>();
    const payload: any = {
      url: '/documents/handle_document',
      id: this.id
    };
    if (this.documentType === '1') {// 发文才需要finish字段 0：直接保存 1：文件签发
      payload.finish = '0';
    }

    if (ids.length > 0) {
      payload.staff_ids = ids;
    }
    payload.document_type = this.documentType || 0;
    params.set('opinion', opinion);
    payload.opinion = opinion;
    this.setRequest(payload.url, payload).then((res) => {
      this.dialogService.toast('提交成功');
      this.events.publish(AppConfig.Document.DocumentDetail);
      this.navController.back();
    });
  }


  go(eventName) {
    localStorage.num = 0;
    this.nav('/receive-document/staff-select/0000', {
      title: 'aaa', url: 'bbb', depart_id: '0000',
        isSelectOne: false,
      eventName,
      selected_staff : JSON.stringify(this.selectedStaff),
      selectedStaff : JSON.stringify(this.selectedStaff)
    });
  }

}
