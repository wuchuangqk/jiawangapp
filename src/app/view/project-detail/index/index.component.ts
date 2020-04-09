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
  public menu_id = 1;
  // 项目id
  public pid = 0;
  public content = '';
  menuList: Array<object> = [
    {id: 1, name: '基本信息'},
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
    this.pid = this.query('pid');
    this.title = this.query('name');
  }


  ngOnInit() {
  }

  change() {
    this.slides.getActiveIndex().then((index) => {
      this.menu_id = index;
    });
  }

  segmentChange(index) {
    this.menu_id = index;
    this.slides.slideTo(index);
  }
}
