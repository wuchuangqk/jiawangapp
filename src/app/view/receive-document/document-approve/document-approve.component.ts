import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {DialogService} from '../../../service/dialog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Events, NavController} from '@ionic/angular';
import {AppConfig} from '../../../app.config';

@Component({
  selector: 'app-document-approve',
  templateUrl: './document-approve.component.html',
  styleUrls: ['./document-approve.component.scss'],
})
export class DocumentApproveComponent extends BasePage implements OnInit {
  public selectedStaff = [];

  public fileArray = [];
  public _selectedStaff = [];
  public id: string;
  public payload = {
    opinion: '',
    url: '/documents/shenhe_docment',
    id: '',
    staff_ids: '',
    staff_viewids: ''
  };
  constructor(
      public http: HttpService,
      public router: Router,
      public dialogService: DialogService,
      public navController: NavController,
      public events: Events,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService);
    this.title = this.query('title');
    this.payload.id = this.query('id');
  }

  ngOnInit() {}
  go( eventName, selectedStaff) {
    localStorage.num = 0;
    this.nav('/receive-document/staff-select/0000', {
      title: '选择人员', url: 'bbb', depart_id: '0000',
      isSelectOne: false,
      eventName,
      selected_staff : JSON.stringify(selectedStaff),
      selectedStaff : JSON.stringify(selectedStaff)
    });
  }

  getFileArray(fileArray) {
    this.fileArray = fileArray;
  }
  getIds(arr): string {
    return  arr.map(item => item.id).join(',');
  }
  /**
   * 保存
   * @param opinions
   */
  public checkParams(): boolean {
    if (!this.payload.opinion) {
        this.dialogService.toast('请输入意见！');
        return false;
    }
    return true;
  }
  save() {
    const staff_ids = this.getIds(this.selectedStaff);
    const staff_viewids = this.getIds(this._selectedStaff);

    if (staff_ids.length > 0) {
      this.payload.staff_ids = staff_ids;
    }
    if (staff_viewids.length > 0) {
      this.payload.staff_viewids = staff_viewids;
    }
    if (!this.checkParams()) {
      return;
    }

    // this.uploadFiles('/baoXiao/zhsp_yinzhang_add', this.params, this.fileArray).then((res) => {
      this.setRequest(this.payload.url, this.payload).then((res) => {
      this.dialogService.alert('审批完毕!');
      this.events.publish(AppConfig.Document.DocumentShenPiList);
      this.events.publish(AppConfig.Document.DocumentDetail);
      this.events.publish(AppConfig.Home.Badge);
      this.navController.back();
    });
  }
}
