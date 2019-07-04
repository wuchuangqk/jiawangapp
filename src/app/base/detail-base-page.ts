import { OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { DialogService } from '../service/dialog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BasePage} from './base-page';
interface IDetail {
    content: string;
}
export class DetailBasePage extends BasePage {
    public url: string;
    public id: string;
    public detail: IDetail;
    public content = '';
  constructor(
      public http: HttpService,
      public router: Router,
      public dialogService: DialogService,
      public route?: ActivatedRoute,
  ) {
    super(http, router, dialogService);
  }
  public async getDetail() {
    const res = (await this.request(this.url + '/' + this.id, {}));
    this.detail = res.data;
    this.content = res.data.content;
  }
  doRefresh(event) {
      super.doRefresh(event);
      this.getDetail();
  }
}
