import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import {Events, IonSlides} from '@ionic/angular';
import {NavController} from '@ionic/angular';
import {AppConfig} from '../../../app.config';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent extends BasePage implements OnInit, OnDestroy {
  @ViewChild(IonSlides) slides: IonSlides;
  itemList = [];
  daiBanList = [];
  yiBanList = [];
  LiuChengJianKongList = [];
  isHasMonitor: boolean = false;
  isHasShenQing: boolean = false;
  keyword = '';
  public menuList = [
    // {title: '我的申请'},
    {title: '待办'},
    {title: '已办'},
    // { title: '流程监控' },
  ];
  public index = 0;
  isGetPermission = false

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
    // 查询是否有流程监控权限
    this.request('/zhsp/isMonitor', {}).then((res) => {
      if(res.data) {
        this.isHasMonitor = true;
        this.menuList.push({
          title: '流程监控'
        });
      }
    });
    this.request('/home/homeaccess', {}).then((res) => {
      this.isHasShenQing = res.data['用印申请']
      if (this.isHasShenQing) {
          this.menuList.unshift({ title: '我的申请' })
      }
      this.isGetPermission = true
    })
    this.getDocumentList();
    this.getDaiBanList();
    this.events.subscribe(AppConfig.Synthesize.List, () => {
      this.getDocumentList();
    });
    this.events.subscribe(AppConfig.Synthesize.ShenPiList, () => {
      this.getDaiBanList();
    });
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

  segmentChange(index) {
    this.index = index;
    this.slides.slideTo(index);
  }

  getRequest() {
    if (this.isHasShenQing) {
      if (this.index == 0) {
        this.getDocumentList();
      } else if (this.index == 1) {
        this.getDaiBanList();
      } else if (this.index === 2) {
        // this.getLiuChengJianKongList();
        this.getMyShenPiList();
      } else if (this.index === 3) {
        this.getLiuChengJianKongList();
      }
    } else {
      if (this.index == 0) {
        this.getDaiBanList();
      } else if (this.index == 1) {
        this.getMyShenPiList();
      } else if (this.index === 2) {
        // this.getLiuChengJianKongList();
        this.getLiuChengJianKongList();
      }
    }
    
  }

  /*
   *我申请的
   */
  getDocumentList() {
    this.request('/zhsp/zhsp_list', {}).then((res) => {
      this.itemList = res.data;
    });
  }

  /*
  * 待办
  */
  getDaiBanList() {
    this.request('/zhsp/shenpi_list', {}).then((res) => {
      this.daiBanList = res.data;
    });
  }

  /**
   * 已办
   */
  getMyShenPiList() {
    this.request('/zhsp/mylist', {}).then((res) => {
      this.yiBanList = res.data;
    });
  }

  getLiuChengJianKongList() {
    this.request('/zhsp/monitorlist', {keyword: this.keyword}).then((res) => {
      this.LiuChengJianKongList = res.data;
    });
  }

  doRefresh(event) {
    super.doRefresh(event);
    this.getRequest();
  }

  /**
   * 流程监控根据申请人姓名查询
   * @param event
   */
  doSearch(event) {
    this.keyword = event.detail.value;
    this.getLiuChengJianKongList()
  }
}
