import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import {Events, NavController} from '@ionic/angular';
import {BasePage} from '../../../base/base-page';

@Component({
  selector: 'app-dong-tai-zi-jin',
  templateUrl: './dong-tai-zi-jin.component.html',
  styleUrls: ['./dong-tai-zi-jin.component.scss'],
})
export class DongTaiZiJinComponent extends BasePage implements OnInit {

  public itemList = [];
  constructor(
      public http: HttpService,
      public router: Router,
      public dialogService: DialogService,
      public events: Events,
      public navController: NavController,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService);
  }
  search(e: CustomEvent) {
    console.log(e.detail.value);
  }
  ngOnInit() {
    this.request('/juece/dmoney', {
    }).then((res) => {
      this.itemList = res.data;
    });
  }
}
