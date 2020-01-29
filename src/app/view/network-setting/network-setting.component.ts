import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../base/base-page';
import {HttpService} from '../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../service/dialog.service';
import {NavController} from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

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
      private sqlite: SQLite,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService, route);
  }

  ngOnInit() {

  }
  sql(){
        this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }) .then((db: SQLiteObject) => {
          db.executeSql('create table danceMoves(name VARCHAR(32))', [])
              .then(() => console.log('Executed SQL'))
              .catch(e => console.log(e));
        }) .catch(e => console.log(e));
  }

}
