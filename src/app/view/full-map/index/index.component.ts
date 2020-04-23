import { Component, OnInit } from '@angular/core';
import { MP } from './map';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Events, NavController} from '@ionic/angular';
import {DialogService} from '../../../service/dialog.service';
// declare const BMap;

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


  constructor(
      public http: HttpService,
      public router: Router,
      public navController: NavController,
      public dialogService: DialogService,
      private events: Events,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService);
    // this.url = this.query('url');
    // this.slides.startAutoplay();
    //

  }
  ngOnInit() {
      this.dialogService.loading();
    setTimeout(() => {
      this.request('/home/maplist', {}).then((res) => {
        document.getElementById('allmap').innerHTML = '';
        MP.init().then((BMap) => {
          this.dialogService.dismiss();
          this.init(BMap, res.data);
        });
      });
    }, 1000);
  }
  getItem(id) {
    this.index = Number(id);
  }

  addMarker(point, map, BMap, content) {
    const marker = new BMap.Marker(point);
    map.addOverlay(marker);


    const sContent = content;
    const infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
    marker.addEventListener('click', function() {
      this.openInfoWindow(infoWindow);
      // 图片加载完毕重绘infowindow
      // document.getElementById('imgDemo').onload = () => {
      //   infoWindow.redraw();   // 防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
      // };
    });
  }
  init(BMap, dataList) {
    const map = new BMap.Map('allmap');
    map.enableScrollWheelZoom(true);     // 开启鼠标滚轮缩放
    const pointer = new BMap.Point(117.471410, 34.443026);
    map.centerAndZoom(pointer, 13);   //




    // 没有设置 center 和 zoom 属性的地图组件是不进行地图渲染的。当center 属性为合法地名字符串时例外，因为百度地图会根据地名自动调整 zoom 的值。



    // 百度地图API功能
    // const map = new BMap.Map('allmap');
    // const point = new BMap.Point(116.404, 39.915);
    // map.centerAndZoom(point, 15);
    // 编写自定义函数,创建标注
    // 随机向地图添加25个标注
    const bounds = map.getBounds();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();
    // 添加标注点
    for (const item of dataList) {
      const P_OINT = new BMap.Point(item.maplng, item.maplat);
      this.addMarker(P_OINT, map, BMap, item.marker);
    }
    // for (let i = 0; i < 25; i ++) {}





  }
}
