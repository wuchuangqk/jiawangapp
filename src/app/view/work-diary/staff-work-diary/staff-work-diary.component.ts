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
  private itemList = [];
  private url = '';
  public list = [];
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
    // console.log(params);
    this.setRequest(this.payload.url, {data}).then(() => {

      this.getList();
      this.dialogService.toast('添加工作日志成功！');
      // this.events.publish(AppConfig.WorkDiary.List);
      // this.navController.back();
    });
  }
  ionBlur(item) {
    this.payload.date = item.date;
    this.payload.morning = item.morning;
    // this.flag = false;
  }
  ionFocus(item) {
    this.flag = true;
  }
  ngOnInit() {
    this.getList();
    // this.events.subscribe(AppConfig.WorkDiary.List, () => {
    //   this.getList();
    // });
  }

  getList() {
    this.list = [];
    return  this.request('/work_logs/GetUserLog', {
      userid: this.userid
    }).then((response) => {
      this.itemList = response.data.daily;
      this.week = response.data.week;
      this.dateSet = new Set<string>();
      for (const item of this.itemList) {
        const d = new Date(item.date);
        this.dateSet.add( `${d.getFullYear()}-${d.getMonth() + 1}`);
      }
      this.dateSet.forEach((item) => {
        const _temp: any = {};
        _temp.date = item;
        _temp.arr = [];
        for (const _item of this.itemList) {
          const d = new Date(_item.date);
          const _date = `${d.getFullYear()}-${d.getMonth() + 1}`;
          // _item.day = this.dateProvider.getFormatWeek(d);
          _item.d = d.getDate();
          _item.month = d.getMonth() + 1;
          if (item === _date) {
            _temp.d = `${d.getFullYear()}年${d.getMonth() + 1}月`;
            _temp.arr.push(_item);
          }
        }
        this.list.push(_temp);
      });
    });
  }

}