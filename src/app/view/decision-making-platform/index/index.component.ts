import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {DialogService} from '../../../service/dialog.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent extends BasePage implements OnInit {
  index = 0;
  menuList: Array<object> = [
    {id: 0, name: '预备项目'},
    {id: 1, name: '前期项目'},
    {id: 2, name: '前期项目'},
    {id: 3, name: '前期项目'},
  ];
  projectList: object[] = [
    {name: '姚笛懒理文章马伊琍离婚 青岛拍夜戏被偶遇'},
    {name: '姚笛懒理文章马伊琍离婚 青岛拍夜戏被偶遇'},
    {name: '姚笛懒理文章马伊琍离婚 青岛拍夜戏被偶遇'},
  ];

  constructor(
      public http: HttpService,
      public router: Router,
      public navController: NavController,
      public dialogService: DialogService,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService);
  }
  ngOnInit() {}
}
