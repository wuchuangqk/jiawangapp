import { Component, OnInit } from '@angular/core';
import {DetailBasePage} from '../../../base/detail-base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Events} from '@ionic/angular';
import {AppConfig} from '../../../app.config';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent  extends DetailBasePage implements OnInit {
  public title = '详情';
  public content: SafeHtml;
  public payload: {
    document_type: string
  };
  constructor(
      public http: HttpService,
      public router: Router,
      public navController: NavController,
      public dialogService: DialogService,
      public sanitizer: DomSanitizer,
      public events: Events,
      public route?: ActivatedRoute,
  ) {
    super( http, router, dialogService, sanitizer, navController);
    this.url = this.query('url');
    this.id = this.query('id');
  }

  ngOnInit() {
    this.getDetail();
    this.events.subscribe(AppConfig.Document.DocumentDetail, () => {
      this.getDetail();
    });
  }
  public getDetail() {
      return  this.request(this.url + '/' + this.id, {}).then((res) => {
        this.content = this.transform(res.data);
      });
  }
}