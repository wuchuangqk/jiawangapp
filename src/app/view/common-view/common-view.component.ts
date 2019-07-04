import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../service/dialog.service';
import {DetailBasePage} from '../../base/detail-base-page';

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
      public route?: ActivatedRoute,
  ) {
    super(http, router, dialogService, route );
    this.title = this.query('title');
    this.url = this.query('url');
    this.id = this.query('id');
    this.contentTitle = this.query('contentTitle');
  }

  ngOnInit() {
    this.getDetail();
  }

}
