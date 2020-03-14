import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../../../service/http.service';
import {DialogService} from '../../../service/dialog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ListBasePage} from '../../../base/list-base-page';
import {Events, IonSlides, NavController} from '@ionic/angular';
import {AppConfig} from '../../../app.config';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent extends ListBasePage implements OnInit, OnDestroy {
  public addUrl: string;
  public isCanCommit: boolean;
  @ViewChild(IonSlides) slides: IonSlides;
  public index = 0;
  public myList = [];
  public menuList = [
    { title: '工作交流' },
    { title: '我的工作交流' },
  ];

  constructor(
      public http: HttpService,
      public router: Router,
      public dialogService: DialogService,
      public navController: NavController,
      public events: Events,
      public route?: ActivatedRoute,
  ) {
    super(http, router, dialogService, navController);
    this.title = this.query('title');
    this.url = this.query('url');
    this.isCanCommit = this.query('isCanCommit') === 'true' ? true : false;
    console.log(this.isCanCommit);

    this.addUrl = this.query('addUrl');
    console.log(this.addUrl);
  }
  ngOnInit() {
    this.events.subscribe(AppConfig.Notice.List, () => {
      this.getListData();
      this.getMyListData();
    });
    this.getListData();
    this.getMyListData();
  }
    segmentChange(index) {
        this.index = index;
        this.slides.slideTo(index);
    }
    getMyListData() {
      this.request('/work_dynamics/my_list', {}).then((res) => {
        console.log(res);
        this.myList = res.data;
      });
    }
  change() {
    this.slides.getActiveIndex().then((index) => {
      this.index = index;
      // this.getRequest();
      this.getListData();
      this.getMyListData();
    });
  }

  ngOnDestroy() {
    this.events.unsubscribe(AppConfig.Notice.List);
  }
}
