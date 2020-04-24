import { OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpService } from '../service/http.service';
import { DialogService } from '../service/dialog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BasePage} from './base-page';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
interface IDetail {
    content: string;
    control?: string;
    finish?: string;
}
export class DetailBasePage extends BasePage {
    public payload = {};
    public url: string;
    public id: string;
    public detail: IDetail = {
        content: '',
        control: '',
        finish: '',
};
    public content: SafeHtml = '';
    public comment_num: any;
  constructor(
      public http: HttpService,
      public router: Router,
      public dialogService: DialogService,
      public sanitizer: DomSanitizer,
      public navController: NavController,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService);
  }
  public async getDetail(data) {
    const res = (await this.request(this.url + '/' + this.id, data));
    this.detail = res.data;
    console.log(res.data);
    if (res.data) {
          this.comment_num = res.data.comment_num;
      }
    if (res.data.json) {
        this.detail.control = '1';
    }
    this.content = this.transform(res.data.content || res.data.json) || '';
    console.log(this.content);
  }
  doRefresh(event) {
      super.doRefresh(event);
      this.getDetail(this.payload);
  }
    public transform(content): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(content);
    }
}
