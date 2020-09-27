import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import {BasePage} from "../../../base/base-page";
import {HttpService} from "../../../service/http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "../../../service/dialog.service";
import {DomSanitizer} from "@angular/platform-browser";
import {FileService} from "../../../service/FileService";

@Component({
  selector: 'app-jia-qian',
  templateUrl: './jia-qian.component.html',
  styleUrls: ['./jia-qian.component.scss'],
})
export class JiaQianComponent extends BasePage implements OnInit {
  public signIndex = 0;
  public id ="";
  public isJiaQian = false;
  public selectedStaff = [];
  // 签发人员
  public qianFaList=[];
  public shenGaoList = [];
  public heGaoList = [];
  public params={
    id: "",
    staff_ids:""
  };

  constructor(
      public http: HttpService,
      public router: Router,
      public dialogService: DialogService,
      public sanitizer: DomSanitizer,
      public navController: NavController,
      public fileService: FileService,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService);
    this.params.id = this.query("id")
    console.log(this.id);
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



  async ngOnInit() {
  }
  public async save(){
      this.params.staff_ids = this.getIds(this.selectedStaff);
    await this.setRequest("/receipt/signadd",this.params)
    await this.dialogService.alert("提交成功！",()=>{
      this.navController.back();
    })
  }

}
