import {Component, OnDestroy, OnInit} from '@angular/core';
import {BasePage} from '../../base/base-page';
import { AppConfig} from '../../app.config';
import {ListBasePage} from '../../base/list-base-page';
import {HttpService} from '../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../service/dialog.service';
import {NavController} from '@ionic/angular';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-cultural',
  templateUrl: './cultural.component.html',
  styleUrls: ['./cultural.component.scss'],
})
export class CulturalComponent extends ListBasePage implements OnInit, OnDestroy {

  constructor(
      public http: HttpService,
      public router: Router,
      public dialogService: DialogService,
      public navController: NavController,
      public events: Events,
      public route?: ActivatedRoute,
  ) {
    super(http, router, dialogService, navController);
    this.url = '/notices/wenxuan_list';
  }
  ngOnInit() {
    this.events.subscribe(AppConfig.CulturalPropaganda.List, () => {
      this.getListData();
    });
    this.getListData();
  }
  ngOnDestroy() {
    this.events.unsubscribe(AppConfig.Notice.List);
  }


}
