import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../service/http.service';
import {DialogService} from '../../service/dialog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ListBasePage} from '../../base/list-base-page';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss'],
})
export class NoticeComponent extends ListBasePage implements OnInit {
  constructor(
      public http: HttpService,
      public router: Router,
      public dialogService: DialogService,
      public navController: NavController,
      public route?: ActivatedRoute,
  ) {
    super(http, router, dialogService, navController);
    this.title = this.query('title');
    this.url = this.query('url');
  }
  ngOnInit() {
    this.getListData();
  }
  ionViewDidLeave() {

  }
}

