import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../service/dialog.service';
import {Events, NavController} from '@ionic/angular';
import {ListBasePage} from '../../base/list-base-page';

@Component({
  selector: 'app-fang-chan-guan-li',
  templateUrl: './fang-chan-guan-li.component.html',
  styleUrls: ['./fang-chan-guan-li.component.scss'],
})
export class FangChanGuanLiComponent extends ListBasePage implements OnInit {
  public keyword = '';
  public fztype = '';
  public issf = '';
  constructor(
      public http: HttpService,
      public router: Router,
      public dialogService: DialogService,
      public events: Events,
      public navController: NavController,
      public route?: ActivatedRoute,
  ) {
    super(http, router, dialogService, navController);
    this.url = '/zichan/fangchanlist';
  }
  search(e: CustomEvent) {
    this.keyword = e.detail.value;
    this.listData = [];
    this.ngOnInit();
  }
  ngOnInit() {
    this.payload = {
      keyword: this.keyword,
      fztype: this.fztype,
      issf: this.issf
    };
    this.getListData();
  }
  changeFzType(event) {
    console.log(event);
    this.fztype = event;
    this.listData = [];
    this.ngOnInit();
  }
  issfChange(issf) {
    this.issf = issf;
    this.listData = [];
    this.ngOnInit();
  }
}
