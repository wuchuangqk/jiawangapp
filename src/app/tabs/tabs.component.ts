import { Component } from '@angular/core';
import {BasePage} from '../base/base-page';
import {HttpService} from '../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {DialogService} from '../service/dialog.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.component.html',
  styleUrls: ['tabs.component.scss']
})
export class Tabs extends BasePage {
  public rz = false;
  public zc = false;
  public jc = false;
  constructor(
      public http: HttpService,
      public router: Router,
      public navController: NavController,
      public dialogService: DialogService,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService, route);
    this.request('/home/homeaccess', {}).then((res) => {
        const data = res.data;
        this.rz = data.rz;
        this.zc = data.zc;
    });
  }


}
