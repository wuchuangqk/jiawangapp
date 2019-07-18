import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../../../service/http.service';
import {DialogService} from '../../../service/dialog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ListBasePage} from '../../../base/list-base-page';
import {Events, NavController} from '@ionic/angular';
import {AppConfig} from '../../../app.config';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent extends ListBasePage implements OnInit, OnDestroy {
  constructor(
      public http: HttpService,
      public router: Router,
      public dialogService: DialogService,
      public navController: NavController,
      public events: Events,
      public route?: ActivatedRoute,
  ) {
    super(http, router, dialogService, navController);
    this.title = this.query('title');
    this.url = this.query('url');
  }
  ngOnInit() {
    this.events.subscribe(AppConfig.Notice.List, () => {
      this.getListData();
    });
    this.getListData();
  }
  ngOnDestroy() {
    this.events.unsubscribe(AppConfig.Notice.List);
  }
}

