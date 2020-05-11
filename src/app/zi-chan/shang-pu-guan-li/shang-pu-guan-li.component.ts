import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../service/dialog.service';
import {Events, NavController} from '@ionic/angular';
import {BasePage} from '../../base/base-page';

@Component({
  selector: 'app-shang-pu-guan-li',
  templateUrl: './shang-pu-guan-li.component.html',
  styleUrls: ['./shang-pu-guan-li.component.scss'],
})
export class ShangPuGuanLiComponent extends BasePage implements OnInit {
  public itemList = [];
  public keyword = '';
  public sptype = '';
  public issf = '';

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
    this.keyword = e.detail.value;
    this.ngOnInit();
  }
  ngOnInit() {
    this.request('/zichan/shangpulist', {
      keyword: this.keyword,
      sptype : this.sptype,
      issf: this.issf,
    }).then((res) => {
      this.itemList = res.data;
    });
  }

}
