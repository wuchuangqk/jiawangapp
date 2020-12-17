import {Component, Input, OnInit} from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import {Events, NavController} from '@ionic/angular';
import {DateProvider} from '../../../service/Date';
import {DatePipe} from '@angular/common';
import {AppConfig} from '../../../app.config';

@Component({
  selector: 'app-zi-gong-si-add',
  templateUrl: './zi-gong-si-add.component.html',
  styleUrls: ['./zi-gong-si-add.component.scss'],
})
export class ZiGongSiAddComponent extends BasePage implements OnInit {
  @Input() index;

  public selectedStaff = [];
  // 提交的参数
  // 督办类别
  public id: string;
  qjtypeList: [];
  public fenGuanLingDaoList = [];
  public chuShiLingDaoList = [];
  type = 0;
  /*    params = {
          // 加班时间
          jbtime: '',
          // 加班事由
          qjyy: '',
          // 加班类别
          qjtype: 0,
          // 处理人名单
          staff_ids: '',
          signCreator1:'',
          signCreator2:'',

      };*/
  params = {
    // 加班时间
    jbtime:'',
    // 工作安排
    qjyy:"",
    // 人员安排
    staff_ids:'',
    // 审批人序号
    index:1,
    // 审批人id
    user:''
  };

  constructor(
      public http: HttpService,
      public router: Router,
      public dialogService: DialogService,
      public navController: NavController,
      public dateProvider: DateProvider,
      public events: Events,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService);
    this.title = this.query('title');
    const date = new Date();
    const date2 = new Date().getTime() + 24 * 60 * 60 * 1000;
    const datePipe = new DatePipe('en-US');
    this.params.jbtime = datePipe.transform(date, 'yyyy-MM-dd HH:mm');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
/*    this.username = userInfo.name;
    this.params.staff_ids = userInfo.id;*/
    this.selectedStaff = [{
      id:userInfo.id,
      isSelected: true,
      name: userInfo.name,
      position: userInfo.position
    }];
  }

  ngOnInit() {
    this.fenGuanLingDao();
    this.chuShiLingDao();
  }

  private chuShiLingDao() {
    this.request('/jiaban/signCreator1', {}).then((res) => {
      this.chuShiLingDaoList = res.data;
    });
  }

  // private buShiLingDao(){
  //     this.request('/qingjia/signCreator2', {}).then((res) => {
  //         this.buShiLingDaoList = res.data;
  //     });
  // }

  private fenGuanLingDao() {
    this.request('/jiaban/signCreator2', {}).then((res) => {
      this.fenGuanLingDaoList = res.data;
    });
  }


  go(eventName, selectedStaff, isSelectOne) {
    localStorage.num = 0;
    this.nav('/receive-document/staff-select/0000', {
      title: '选择人员', url: 'bbb', depart_id: '0000',
      isSelectOne,
      eventName,
      selected_staff: JSON.stringify(selectedStaff),
      selectedStaff: JSON.stringify(selectedStaff)
    });
  }

  // 检查参数
  private checkParams(params): boolean {
    console.log('params.qjyy',params.qjyy);
    if (!params.jbtime) {
      this.dialogService.toast('请选择加班开始时间!');
      return false;
    } else if (!params.qjyy) {
      this.dialogService.toast('请输入工作安排!');
      return false;
    } else if (!params.user) {
      this.dialogService.toast(params.index == 1 ? '请选择公司负责人!' : '请选择集团公司分管领导!');
      return false;
    }
    /*if(this.type===0){
        if(!params.signCreator1){
            this.dialogService.toast("请选择处室负责人");
            return false;
        }
    }*/
    return true;
  }

  // 审核人名单列表
  getIds(arr): string {
    return arr.map(item => item.id).join(',');
  }

  public save(): void {
    this.params.staff_ids = this.getIds(this.selectedStaff);
    if (!this.checkParams(this.params)) {
      return;
    }
    this.params.jbtime = this.dateProvider.DateTimeFormat(new Date(this.params.jbtime));
    // this.params.qjetime = this.dateProvider.DateTimeFormat(new Date(this.params.qjetime));
    this.setRequest('/jiaban/jiaban_add2', this.params).then((res) => {
      this.dialogService.toast('申请成功！');
      this.events.publish(AppConfig.OvertimeWork.ShenPiList);
      this.events.publish(AppConfig.OvertimeWork.List);
      this.navController.back();
    });
  }

}
