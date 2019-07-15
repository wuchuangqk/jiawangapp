import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import {Events, NavController} from '@ionic/angular';
import {AppConfig} from '../../../app.config';
import {json} from '@angular-devkit/core';

@Component({
  selector: 'app-document-handle',
  templateUrl: './document-handle.component.html',
  styleUrls: ['./document-handle.component.scss'],
})
export class DocumentHandleComponent extends BasePage implements OnInit {
  public url = '';
  payload = {
    opinion: '',
    url: '',
    staff_ids: '',
    id: '',
    document_type: '0',
  };
  documentType: string;
  selectedStaff = [];
  constructor(
      public http: HttpService,
      public router: Router,
      public dialogService: DialogService,
      public events: Events,
      public navController: NavController,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService);
    this.title = this.query('title');
    this.payload.id = this.query('id');
    this.payload.url = this.query('handleUrl');
    this.documentType = this.query('document_type');
  }

  ngOnInit() {
  }

  getIds(arr): string {
    return  arr.map(item => item.id).join(',');
  }
  save() {
    if (!this.payload.opinion) {
      this.dialogService.toast('请输入意见！');
      return ;
    }
    this.payload.staff_ids = this.getIds(this.selectedStaff);
    this.dialogService.toast('正在提交数据...');
    this.payload.document_type = this.documentType || '0';
    this.dialogService.alert(JSON.stringify(this.payload));
    this.setRequest(this.payload.url, this.payload).then((res) => {
      this.dialogService.alert(JSON.stringify(res));
      this.dialogService.toast('提交成功');
      this.events.publish(AppConfig.Document.DocumentDetail);
      this.events.publish(AppConfig.Document.DocumentList);
      this.events.publish(AppConfig.Home.Badge);
      this.events.publish(AppConfig.Assign.List);
      this.events.publish(AppConfig.Assign.DoneList);
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
