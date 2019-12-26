import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../base/base-page';
import {HttpService} from '../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {DialogService} from '../../service/dialog.service';

@Component({
  selector: 'app-read-list',
  templateUrl: './read-list.page.html',
  styleUrls: ['./read-list.page.scss'],
})
export class ReadListPage extends BasePage implements OnInit {
  protected url = '';
  protected id = '';
  public readList = [];
  public noReadList = [];
  constructor(
      public http: HttpService,
      public router: Router,
      public navController: NavController,
      public dialogService: DialogService,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService, route);
    this.title = this.query('title');
    this.url = this.query('url');
    this.id = this.query('id');
  }

  ngOnInit() {
      this.request(this.url + this.id, {}).then((res) => {
      this.readList = res.data.hasreader;
      this.noReadList = res.data.noreader;
      });
  }

}
