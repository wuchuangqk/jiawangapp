import {Component, OnInit, ViewChild} from '@angular/core';
import {Events, IonSlides, NavController} from "@ionic/angular";
import {HttpService} from "../../service/http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "../../service/dialog.service";
import {AppConfig} from "../../app.config";
import {BasePage} from "../../base/base-page";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-rong-zi-sheng-pi',
  templateUrl: './rong-zi-sheng-pi.component.html',
  styleUrls: ['./rong-zi-sheng-pi.component.scss'],
})
// 融资审批
export class RongZiShengPiComponent  extends BasePage implements OnInit {


  @ViewChild(IonSlides) slides: IonSlides;
  itemList = [];
  daiBanList = [];
  yiBanList= [];
  LiuChengJianKongList = [];
  isHasShenQing: boolean = false;
  public menuList = [
    // { title: '我的申请' },
    { title: '待办' },
    { title: '已办' },
    // { title: '流程监控' },
  ];
  public index = 0;
  isGetPermission = false
  constructor(
      public http: HttpService,
      public router: Router,
      public navController: NavController,
      public sanitizer: DomSanitizer,
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

    this.getDocumentList();
    this.getDaiBanList();
    this.events.subscribe(AppConfig.Synthesize.List, () => {
      this.getDocumentList();
    });
    this.events.subscribe(AppConfig.Synthesize.ShenPiList, () => {
      this.getDaiBanList();
    });
    this.request('/home/homeaccess', {}).then((res) => {
      this.isHasShenQing = res.data['融资审批申请']
      if (this.isHasShenQing) {
          this.menuList.unshift({ title: '我申请的' })
      }
      this.isGetPermission = true
    })
  }
  ngOnDestroy(): void {
    this.events.unsubscribe(AppConfig.Synthesize.List);
    this.events.unsubscribe(AppConfig.Synthesize.ShenPiList);
  }
  change() {
    this.slides.getActiveIndex().then((index) => {
      this.index = index;
      this.getRequest();
    });
  }
  public transform(content): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
  segmentChange(index) {
    this.index = index;
    this.slides.slideTo(index);
  }
  getRequest() {
    if (this.isHasShenQing) {
      if (this.index == 0) {
        this.getDocumentList();
      } else if( this.index == 1){
        this.getDaiBanList();
      }else if( this.index === 2 ){
        this.getMyShenPiList();
      }
    } else {
      if (this.index == 0) {
        this.getDaiBanList();
      } else if( this.index == 1){
        this.getMyShenPiList();
      }
    }
  }
  /*
   *我申请的
   */
  getDocumentList() {
    this.request('/rongzi/mylist', {}).then((res) => {
      this.itemList = res.data;
    });
  }
  /*
  * 待办
  */
  getDaiBanList() {
    this.request('/rongzi/todo', {}).then((res) => {
      this.daiBanList = res.data;
    });
  }
  /**
   * 已办
   */
  getMyShenPiList() {
    this.request('/rongzi/hasdone', {}).then((res) => {
      this.yiBanList = res.data;
    });
  }
  getLiuChengJianKongList() {
    this.request('/qingjia/liuChengJianKong', {type: 4}).then((res) => {
      this.LiuChengJianKongList = res.data;
    });
  }
  doRefresh(event) {
    super.doRefresh(event);
    this.getRequest();
  }
}
