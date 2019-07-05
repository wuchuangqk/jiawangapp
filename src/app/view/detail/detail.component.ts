import { Component, OnInit } from '@angular/core';
import {DetailBasePage} from '../../base/detail-base-page';
import {HttpService} from '../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../service/dialog.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent  extends DetailBasePage implements OnInit {
  public title = '详情';
  public payload: {
    document_type: string
  };
  constructor(
      public http: HttpService,
      public router: Router,
      public dialogService: DialogService,
      public sanitizer: DomSanitizer,
      public route?: ActivatedRoute,
  ) {
    super( http, router, dialogService, sanitizer);
    this.url = this.query('url');
    this.id = this.query('id');
    this.payload.document_type = this.query('document_type');
  }

  ngOnInit() {
    this.getDetail(this.payload);
  }
}
