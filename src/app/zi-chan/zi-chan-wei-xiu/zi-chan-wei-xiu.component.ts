import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../service/dialog.service';
import {Events, NavController} from '@ionic/angular';
import {BasePage} from '../../base/base-page';

@Component({
  selector: 'app-zi-chan-wei-xiu',
  templateUrl: './zi-chan-wei-xiu.component.html',
  styleUrls: ['./zi-chan-wei-xiu.component.scss'],
})
export class ZiChanWeiXiuComponent extends BasePage implements OnInit {
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

  ngOnInit() {
    this.request('/zichan/shepilist', {
    }).then((res) => {
      this.itemList = res.data;
    });
  }

}
