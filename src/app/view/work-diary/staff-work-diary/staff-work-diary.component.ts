import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Events, NavController} from '@ionic/angular';
import {DialogService} from '../../../service/dialog.service';
import {AppConfig} from '../../../app.config';
import {BasePage} from '../../../base/base-page';

@Component({
  selector: 'app-staff-work-diary',
  templateUrl: './staff-work-diary.component.html',
  styleUrls: ['./staff-work-diary.component.scss'],
})
export class StaffWorkDiaryComponent extends BasePage implements OnInit {
  public itemList = [];
  private url = '';
  public list = [];
  public addtime = 0;
  private userid;
  public payload = {
    url: '/work_logs/adds',
    date: '',
    morning: ''
    // afternoon: '',
  };
  public week = {
    zweek: '',
    zdate: '',
    zlogs: '',
    zafternoon: ''
  };
  public flag: boolean;
  dateSet: Set<string>;
  constructor(
      public http: HttpService,
      public router: Router,
      public navController: NavController,
      public dialogService: DialogService,
      public events: Events,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService, route );
    this.title = this.query('title');
    this.url = this.query('url');
    this.userid = this.query('userid');
    this.flag = false;
  }
  viewLog(num) {
    this.addtime += num;
    this.getList();
  }
  save() {
    // const datePipe = new DatePipe('en-US');
    // console.log('获取焦点');
    // this.dialogService.toast('已保存！');
    // this.payload.date = datePipe.transform(this.payload.date, 'yyyy-MM-dd');
    const params = [];
    console.log(this.list[0].arr);
    for (const item of this.list[0].arr) {
      params.push(item.morning);
    }
    params.push(this.week.zlogs);
    const data = params.join('|||||');
    this.setRequest(this.payload.url, {data}).then(() => {

      this.getList();
      this.dialogService.toast('添加工作日志成功！');
    });
  }
  ngOnInit() {
    this.getList();
  }

  getList() {
    this.list = [];
    return  this.request('/work_logs/GetUserLog', {
      userid: this.userid,
      addtime: this.addtime
    }).then((response) => {
      this.itemList = response.data.daily;
      this.week = response.data.week;
      this.dateSet = new Set<string>();
      this.itemList.forEach((item) => {
        const d = new Date(item.date);
        item.d = d.getDate();
        item.month = d.getMonth() + 1;
      });
    });
  }
}
