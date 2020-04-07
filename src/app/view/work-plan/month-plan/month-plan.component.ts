import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Events, NavController} from '@ionic/angular';
import {DialogService} from '../../../service/dialog.service';

@Component({
  selector: 'app-month-plan',
  templateUrl: './month-plan.component.html',
  styleUrls: ['./month-plan.component.scss'],
})
export class MonthPlanComponent extends BasePage implements OnInit {
  public itemList = [];
  public month = 1;
  public year = 1;
  public yearList = [];
  constructor(
      public http: HttpService,
      public router: Router,
      public navController: NavController,
      public dialogService: DialogService,
      public events: Events,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService, route );
    this.month = new Date().getMonth() + 1;
    this.year = new Date().getFullYear();
    for (let i = this.year - 3; i <= this.year + 3; i++) {
      this.yearList.push({
        year: i
      });
    }
  }
  ngOnInit() {
      this.getuserspecial();
  }
  change(month) {
      console.log(this.month);
      this.getuserspecial();
  }
  getweekday(year, month, day) {
    const weekArray = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
    const week = weekArray[new Date(`${year}/${month}/${day}`).getDay()]; // 注意此处必须是先new一个Date
    return week;

  }
  getuserspecial() {
    const userId = JSON.parse(localStorage.userInfo).id;
    this.request(
        '/workplan/monthlist',
        {
          month: this.month,
          year: this.year,
          userId,
        }
    ).then((res) => {
      this.itemList = res.data;
    });
  }
}
