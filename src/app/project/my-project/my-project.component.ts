import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../service/dialog.service';
import {Events, NavController} from '@ionic/angular';
import {BasePage} from '../../base/base-page';

@Component({
  selector: 'app-my-project',
  templateUrl: './my-project.component.html',
  styleUrls: ['./my-project.component.scss'],
})
export class MyProjectComponent extends BasePage implements OnInit {
  index = 0;
  public menu_id = 1;
  menuList: Array<object> = [
    {id: 1, name: '预备项目'},
    {id: 2, name: '前期项目'},
    {id: 3, name: '在建项目'},
    {id: 3, name: '竣工项目'},
    {id: 5, name: '决算项目'},
  ];
  projectList: object[] = [];

  constructor(
      public http: HttpService,
      public router: Router,
      public dialogService: DialogService,
      public navController: NavController,
      public events: Events,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService, route);
    this.title = this.query('title');
  }


  ngOnInit() {
    this.getDataList();
  }
  getDataList() {
    this.request('/projects/mylist', {
      menu_id: this.menu_id
    }).then((res) => {
      this.projectList = res.data;
    });
  }
  getItem(id) {
    // tslint:disable-next-line:radix
    this.menu_id = parseInt(id);
    this.getDataList();
    // this.service.get('/projects/list', {menu_id: id}, (response) => {
    //   this.projectList = response.data;
    // });
  }

}
