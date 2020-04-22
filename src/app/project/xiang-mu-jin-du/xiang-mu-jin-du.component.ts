import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../base/base-page';
import {HttpService} from '../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../service/dialog.service';
import {Events, NavController} from '@ionic/angular';

@Component({
  selector: 'app-xiang-mu-jin-du',
  templateUrl: './xiang-mu-jin-du.component.html',
  styleUrls: ['./xiang-mu-jin-du.component.scss'],
})
export class XiangMuJinDuComponent extends BasePage implements OnInit {
  public itemList = [];
  constructor(
      public http: HttpService,
      public router: Router,
      public dialogService: DialogService,
      public navController: NavController,
      public events: Events,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService, route);
    this.title = this.query('title');
  }

  ngOnInit() {
    this.request('/projectmonth/monthlist', {})
        .then((res) => {
          this.itemList = res.data;
        })
    ;
  }

}
