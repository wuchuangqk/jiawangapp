import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../service/http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NavController} from "@ionic/angular";
import {DialogService} from "../../service/dialog.service";
import {MP} from "../../plugins/map";
import {BasePage} from "../../base/base-page";
import {strategy} from "@angular-devkit/core/src/experimental/jobs";
interface mapData {
  maplng:number,
  maplat:number,
  marker:string
}
@Component({
  selector: 'app-zi-chan-fen-bu',
  templateUrl: './zi-chan-fen-bu.component.html',
  styleUrls: ['./zi-chan-fen-bu.component.scss'],
})
export class ZiChanFenBuComponent extends BasePage implements OnInit {
  index = 0;
  public diname: string = '';
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
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService);
  }
  async ngOnInit() {
  await this.getData();
  }
  getItem(id) {
    this.index = Number(id);
  }
  search(e: CustomEvent) {
    this.diname = e.detail.value;
    this.getData();
  }
  async getData() {
    const BMap = await MP.init();
    const res = await this.request('/zichan/maplist', { diname: this.diname});
    // document.getElementById('allmap').innerHTML = '';
    // await this.dialogService.dismiss();
    this.init(BMap, res.data);
  }
  addMarker(point, map, BMap, content) {
    const marker = new BMap.Marker(point);
    map.addOverlay(marker);

    const infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象
    marker.addEventListener('click', function() {
      this.openInfoWindow(infoWindow);
    });
  }
  init(BMap, dataList:Array<mapData>) {
    try {
      console.log(dataList)
      document.getElementById("mapWrapper").innerHTML=``;
      document.getElementById("mapWrapper").innerHTML=`
        <div id="allmap" style="width:100%;height:100%"></div>
    `
      const map = new BMap.Map('allmap');
      map.enableScrollWheelZoom(true);     // 开启鼠标滚轮缩放
      if(dataList.length>0){
        let d = dataList[0];
        const pointer = new BMap.Point(Number(d.maplng), Number(d.maplat));
        map.centerAndZoom(pointer, 13);   //
      }else{
        const pointer = new BMap.Point(117.471410, 34.443026);
        map.centerAndZoom(pointer, 13);   //
      }

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
    }catch (e){
      console.log(e)
    }
  }
}
