import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Events, NavController} from '@ionic/angular';
import {DialogService} from '../../../service/dialog.service';
import {BasePage} from '../../../base/base-page';

@Component({
  selector: 'app-cai-wu-zhi-fu',
  templateUrl: './cai-wu-zhi-fu.component.html',
  styleUrls: ['./cai-wu-zhi-fu.component.scss'],
})
export class CaiWuZhiFuComponent extends BasePage implements OnInit {

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
    this.request('/juece/zhifupay', {
    }).then((res) => {
      this.itemList = res.data;
    });
  }
}
