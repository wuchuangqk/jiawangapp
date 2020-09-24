import { Component, OnInit } from '@angular/core';
import {ModalController, NavController} from "@ionic/angular";
import {BasePage} from "../../../base/base-page";
import {HttpService} from "../../../service/http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "../../../service/dialog.service";
import {DomSanitizer} from "@angular/platform-browser";
import {FileService} from "../../../service/FileService";

@Component({
  selector: 'app-chuan-yue',
  templateUrl: './chuan-yue.component.html',
  styleUrls: ['./chuan-yue.component.scss'],
})
export class ChuanYueComponent extends BasePage implements OnInit {
  public currentModal = null;
  public id = "";
  public selectedStaff = [];
  public params = {
    noticetitle: '',
    noticecontent: '',
    roleType: 1,
    infoType: '通知'
  };
  constructor(
      public http: HttpService,
      public router: Router,
      public dialogService: DialogService,
      public sanitizer: DomSanitizer,
      public navController: NavController,
      public fileService: FileService,
      public modalCtrl: ModalController,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService);
    this.title="传阅";
    this.id= this.query('id');
  }

  go(eventName) {
    localStorage.num = 0;
    this.nav('/receive-document/staff-select/16', {
      title: '选择人员', url: 'bbb', depart_id: '16',
      isSelectOne: false,
      eventName,
      selected_staff : JSON.stringify(this.selectedStaff),
      selectedStaff : JSON.stringify(this.selectedStaff)
    });
  }
  public dismissModal(){
    this.modalCtrl.dismiss();
  }
  public cancel(){
    this.dismissModal()
  }
  public async save(){
    let staff_ids = this.getIds(this.selectedStaff);
    await this.setRequest("/dispatch/signread",{
      id:this.id,
      staff_ids
    })
    await this.dialogService.alert('提交成功!', () => {
      this.navController.back();
    });
  }
}
