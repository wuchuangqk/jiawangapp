import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import {Events, NavController} from '@ionic/angular';
import {IndexedDBService} from '../../../service/IndexedDBService';
import {AppConfig} from '../../../app.config';

@Component({
  selector: 'app-network-setting',
  templateUrl: './network-setting.component.html',
  styleUrls: ['./network-setting.component.scss'],
})
export class NetworkSettingComponent extends BasePage implements OnInit {
  public list = [];
  public selected = Number(localStorage.selectIpId);
  constructor(
      public http: HttpService,
      public router: Router,
      public navController: NavController,
      public dialogService: DialogService,
      public indexedDBService: IndexedDBService,
      public events: Events,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService, route);
  }

  ngOnInit() {
    this.events.subscribe(AppConfig.NetWork.list, () => {
      this.indexedDBService.readAll().then((res) => {
        this.list = res;
      });
    });
    this.indexedDBService.init().then((db) => {
  });

    this.indexedDBService.readAll().then((res) => {
    this.list = res;
    console.log(this.list);
  });

  }
  selectedChange(item) {
    console.log(item);
    const selectIpId = item.target.value;
    localStorage.selectIpId = selectIpId;
    console.log(selectIpId);
    this.indexedDBService.read(selectIpId).then((res: any) => {
      console.log(res);
      localStorage.selectIp = res.ip;
      this.events.publish(AppConfig.NetWork.selectChange);
    });
  }

}
