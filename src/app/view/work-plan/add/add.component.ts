import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import { DateProvider } from '../../../service/Date';
import {DatePipe} from '@angular/common';
import {Events, NavController} from '@ionic/angular';
import {AppConfig} from '../../../app.config';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent extends BasePage implements OnInit {
  public today: number;
  public dateFormmat: string;
  public day: string;
  public payload = {
    url: '/work_logs/add',
    date: '',
    morning: '',
    afternoon: '',
  };

  constructor(
      public http: HttpService,
      public router: Router,
      public navController: NavController,
      public dialogService: DialogService,
      private dateProvider: DateProvider,
      public events: Events,
      public route?: ActivatedRoute,
  ) {
      super(http, router, navController, dialogService);
      this.title = this.query('title');
    // this.url = this.query('url');

      this.today = this.dateProvider.date.getDate();
      this.dateFormmat = this.dateProvider.date.getFullYear() + '年' + (this.dateProvider.date.getMonth() + 1) + '月';
      this.day = this.dateProvider.getFormatWeek(new Date());
      const datePipe = new DatePipe('en-US');
      const date = new Date();
      this.payload.date = datePipe.transform(date, 'yyyy-MM-dd');
  }
  ngOnInit() {}
  ngModelChange(date) {
    this.payload.date = date;
    this.getData();
  }
  getData() {
    this.request(this.payload.url, this.payload).then((res) => {
      this.payload.morning = res.data.morning;
      this.payload.afternoon = res.data.afternoon;
    });
  }
  submit() {
      const datePipe = new DatePipe('en-US');
      // const date = new Date();
      this.payload.date = datePipe.transform(this.payload.date, 'yyyy-MM-dd');
      this.setRequest(this.payload.url, this.payload).then(() => {
          this.dialogService.toast('添加工作日志成功！');
          this.events.publish(AppConfig.WorkDiary.List);
          this.navController.back();
      });
  }
}
