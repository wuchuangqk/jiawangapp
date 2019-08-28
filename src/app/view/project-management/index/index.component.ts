import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
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
  constructor() { }

  ngOnInit() {}
  nav(url, params) {
    this.nav(url, params);
  }
  getItems() {

  }
  getItem(id) {
      // tslint:disable-next-line:radix
    this.index = parseInt(id);
    // this.service.get('/projects/list', {menu_id: id}, (response) => {
    //   this.projectList = response.data;
    // });
  }


}
