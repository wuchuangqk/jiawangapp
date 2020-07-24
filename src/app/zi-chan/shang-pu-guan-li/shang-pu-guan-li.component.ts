import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../service/dialog.service';
import {Events, NavController} from '@ionic/angular';
import {ListBasePage} from '../../base/list-base-page';

@Component({
  selector: 'app-shang-pu-guan-li',
  templateUrl: './shang-pu-guan-li.component.html',
  styleUrls: ['./shang-pu-guan-li.component.scss'],
})
export class ShangPuGuanLiComponent extends ListBasePage implements OnInit {
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
    super(http, router, dialogService, navController);
    this.url = '/zichan/shangpulist';
  }
  search(e: CustomEvent) {
    console.log(e.detail.value);
    this.keyword = e.detail.value;
    this.listData = [];
    this.ngOnInit();
  }
  sptypeChange(sptype) {
    this.sptype = sptype;
    this.listData = [];
    this.ngOnInit();
  }
  issfChange(issf) {
    this.issf = issf;
    this.listData = [];
    this.ngOnInit();
  }
  ngOnInit() {
      this.payload = {
        keyword: this.keyword,
        sptype : this.sptype,
        issf: this.issf,
      };
      this.getListData();
  }

}
