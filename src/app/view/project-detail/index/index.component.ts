import {Component, OnInit, ViewChild} from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import {Events, IonSlides, NavController} from '@ionic/angular';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent extends BasePage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  index = 0;
  // 项目id
  public pid = 0;
  public content = '';
  menuList: Array<object> = [
    {id: 0, name: '基本信息'},
    {id: 1, name: '进度计划'},
    {id: 2, name: '工程招标'},
    {id: 3, name: '工程合同'},
    {id: 4, name: '工程变更'},
    {id: 5, name: '进度月报'},
    {id: 6, name: '质量安全'},
    {id: 7, name: '竣工验收'},
    {id: 9, name: '工程资料'},
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
    this.pid = this.query('pid');
    this.title = this.query('name');
  }


  ngOnInit() {
    this.segmentChange(this.index);
  }

  change() {
    this.slides.getActiveIndex().then((index) => {
      this.index = Number(index);
      console.log(index);
    });
  }

  segmentChange(index) {
    this.index = Number(index);
    this.slides.slideTo(index);
  }
}