import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../service/dialog.service';
import {DetailBasePage} from '../../base/detail-base-page';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-common-view',
  templateUrl: './common-view.component.html',
  styleUrls: ['./common-view.component.scss'],
})
export class CommonViewComponent extends DetailBasePage implements OnInit {
  public contentTitle = '';
  public content = '';
  constructor(
      public http: HttpService,
      public router: Router,
      public dialogService: DialogService,
      public sanitizer: DomSanitizer,
      public route?: ActivatedRoute,
  ) {
    super(http, router, dialogService, sanitizer );
    this.title = this.query('title');
    this.url = this.query('url');
    this.id = this.query('id');
    this.contentTitle = this.query('contentTitle');
  }

  ngOnInit() {
    this.getDetail({});
  }

}
