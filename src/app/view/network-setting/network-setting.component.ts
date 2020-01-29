import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../base/base-page';
import {HttpService} from '../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../service/dialog.service';
import {NavController} from '@ionic/angular';
import {version} from 'punycode';

@Component({
  selector: 'app-network-setting',
  templateUrl: './network-setting.component.html',
  styleUrls: ['./network-setting.component.scss'],
})
export class NetworkSettingComponent extends BasePage implements OnInit {

  constructor(
      public http: HttpService,
      public router: Router,
      public navController: NavController,
      public dialogService: DialogService,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService, route);
  }

  ngOnInit() {

  }

}
