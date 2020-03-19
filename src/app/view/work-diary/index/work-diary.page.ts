import {Component, OnDestroy, OnInit} from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../../service/http.service';
import {DialogService} from '../../../service/dialog.service';
import {Events, NavController} from '@ionic/angular';
import {AppConfig} from '../../../app.config';
import {DatePipe} from '@angular/common';
import {forEach} from '@angular-devkit/schematics';
import {path} from '@angular-devkit/core';


@Component({
  selector: 'app-work-diary',
  templateUrl: './work-diary.page.html',
  styleUrls: ['./work-diary.page.scss'],
})
export class WorkDiaryPage extends BasePage implements OnInit, OnDestroy {
  public itemList = [];
  private url = '';
  public list = [];
  public addtime = 0;
  public special = false;
  public departid = 0;
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
    this.flag = false;
    // this.special = Number(JSON.parse(localStorage.userInfo).special);
  }
  save() {
    const params = [];
    for (const item of this.itemList) {
      params.push(item.morning);
    }
    params.push(this.week.zlogs);
    const data = params.join('|||||');
    console.log(params);
    console.log(data);
    const payload = {
      data,
      addtime: this.addtime,
      type: this.addtime > 0 ? 1 : 0
    };
    this.setRequest(this.payload.url, payload).then(() => {

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
  viewLog(num) {
    this.addtime += num;
    this.getList();
  }
  ngOnInit() {
    this.departid = JSON.parse(localStorage.userInfo).departid;
    this.getuserspecial();
    this.getList();
    this.events.subscribe(AppConfig.WorkDiary.List, () => {
      this.getList();
    });
  }
  ngOnDestroy(): void {
    this.events.unsubscribe(AppConfig.WorkDiary.List);
  }
  getuserspecial() {
    const userid = JSON.parse(localStorage.userInfo).id;
    this.request('/users/getuserspecial', {userid}).then((res) => {
     this.special = res.data.special;
   });
  }
  getList() {
    this.list = [];
    return  this.request(this.url, {
      addtime: this.addtime,
      type: 0
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
  selectDepart() {
    // if (this.special === 2) {
    //   this.nav('work-diary/view-staff-work-diary/' + this.departid, {title: '添加工作日志', departid: this.departid });
    // } else if (this.special === 3) {
      this.nav('work-diary/view-staff-work-diary/' + 3, {title: '添加工作日志', departid: 3, isDepart: true });
    // }
  }
}
