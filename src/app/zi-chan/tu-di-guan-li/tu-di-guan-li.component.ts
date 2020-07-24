import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../service/dialog.service';
import {Events, NavController} from '@ionic/angular';
import {BasePage} from '../../base/base-page';
import {ListBasePage} from '../../base/list-base-page';

@Component({
  selector: 'app-tu-di-guan-li',
  templateUrl: './tu-di-guan-li.component.html',
  styleUrls: ['./tu-di-guan-li.component.scss'],
})
export class TuDiGuanLiComponent extends ListBasePage implements OnInit {
  // public itemList = [];
  public keyword = '';
  public state = '';
  constructor(
      public http: HttpService,
      public router: Router,
      public navController: NavController,
      public dialogService: DialogService,
      public route?: ActivatedRoute,
  ) {
    super(http, router,  dialogService, navController);
    this.url = '/zichan/landlist';
  }
   search(e: CustomEvent) {
    console.log(e.detail.value);
    this.keyword = e.detail.value;
    this.listData = [];
    this.ngOnInit();
  }
  changeStatus(e: CustomEvent) {
    console.log(e.detail.value);
    this.state = e.detail.value;
    this.listData = [];
    this.ngOnInit();
  }
  ngOnInit() {
    this.payload = {
      keyword: this.keyword,
      state: this.state,
    };
    this.getListData();
  }

}
