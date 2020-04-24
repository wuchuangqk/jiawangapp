import { OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpService } from '../service/http.service';
import { DialogService } from '../service/dialog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BasePage} from './base-page';

export class ListBasePage extends BasePage {
    public url: string;
    public listData: any[] = [];
  constructor(
      public http: HttpService,
      public router: Router,
      public dialogService: DialogService,
      public navController: NavController,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService);
  }
  public async getListData() {
    const res = (await this.request(this.url, {}));
    this.listData = res.data;
  }
  doRefresh(event) {
      super.doRefresh(event);
      this.getListData();
  }
}
