import { Component, OnInit } from '@angular/core';
import { MP } from './map';
// declare const BMap;

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

  ngOnInit() {
    MP.init().then((BMap) => {
      this.init(BMap);
    });
  }
  nav(url, params) {
    this.nav(url, params);
  }
  getItems() {

  }
  getItem(id) {
    this.index = parseInt(id);
    // this.service.get('/projects/list', {menu_id: id}, (response) => {
    //   this.projectList = response.data;
    // });
  }
  init(BMap) {
    const map = new BMap.Map('allmap');
    map.enableScrollWheelZoom(true);     // 开启鼠标滚轮缩放
    const pointer = new BMap.Point(117.471410, 34.443026);
    map.centerAndZoom(pointer, 9);   //
    // 没有设置 center 和 zoom 属性的地图组件是不进行地图渲染的。当center 属性为合法地名字符串时例外，因为百度地图会根据地名自动调整 zoom 的值。
  }


}
