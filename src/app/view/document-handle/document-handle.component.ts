import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../base/base-page';
import {HttpService} from '../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../service/dialog.service';

@Component({
  selector: 'app-document-handle',
  templateUrl: './document-handle.component.html',
  styleUrls: ['./document-handle.component.scss'],
})
export class DocumentHandleComponent extends BasePage implements OnInit {

  constructor(
      public http: HttpService,
      public router: Router,
      public dialogService: DialogService,
      public route?: ActivatedRoute,
  ) {
    super(http, router, dialogService);
    this.title = this.query('title');
  }

  ngOnInit() {}

}
