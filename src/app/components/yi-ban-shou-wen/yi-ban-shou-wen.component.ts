import { Component, OnInit } from '@angular/core';
import {ListBasePage} from '../../base/list-base-page';
import {HttpService} from '../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../service/dialog.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-yi-ban-shou-wen',
  templateUrl: './yi-ban-shou-wen.component.html',
  styleUrls: ['./yi-ban-shou-wen.component.scss'],
})
export class YiBanShouWenComponent extends ListBasePage implements OnInit {
  constructor(
      public http: HttpService,
      public router: Router,
      public dialogService: DialogService,
      public navController: NavController,
      public route?: ActivatedRoute,
  ) {
    super(http, router, dialogService, navController);
    this.url = '/receipt/hasdone';
  }

}
