import {Component, OnDestroy, OnInit} from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../../service/http.service';
import {DialogService} from '../../../service/dialog.service';
import {Events, NavController} from '@ionic/angular';
import {AppConfig} from '../../../app.config';


@Component({
  selector: 'app-work-diary',
  templateUrl: './work-diary.page.html',
  styleUrls: ['./work-diary.page.scss'],
})
export class WorkDiaryPage extends BasePage implements OnInit, OnDestroy {
private itemList = [];
private url = '';
public list = [];
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
  }

  ngOnInit() {
    this.getList();
    this.events.subscribe(AppConfig.WorkDiary.List, () => {
       this.getList();
     });
  }
  ngOnDestroy(): void {
    this.events.unsubscribe(AppConfig.WorkDiary.List);
  }

  getList() {
    this.list = [];
    return  this.request(this.url, {
      type: 0
    }).then((response) => {
      this.itemList = response.data;
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
