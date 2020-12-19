import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import {Events, NavController} from '@ionic/angular';
import {DateProvider} from '../../../service/Date';
import {AppConfig} from '../../../app.config';

@Component({
  selector: 'app-select-flow',
  templateUrl: './select-flow.component.html',
  styleUrls: ['./select-flow.component.scss'],
})
export class SelectFlowComponent extends BasePage implements OnInit {

  params = {
    index :1,
    user:""
  };

  curIndex = null;

  chuShiLingDaoList = []; // 处室领导
  buShiLingDaoList = [];  // 部室领导
  public fenGuanLingDaoList = [];
  public zhuYaoLingDaoList = [];

  constructor(
    public http: HttpService,
    public router: Router,
    public dialogService: DialogService,
    public navController: NavController,
    public dateProvider: DateProvider,
    public events: Events,
    public route?: ActivatedRoute,
  ) {
    super(http, router,  navController, dialogService);
  }

  ngOnInit() {
    this.curIndex = Number(this.query('index'));
    this.params.index = this.curIndex + 1;
    this.chuShiLingDao();
    this.buShiLingDao();
    this.fenGuanLingDao();
    this.zhuYaoLingDao();
  }
  private chuShiLingDao() {
    this.request('/qingjia/signCreator1', {}).then((res) => {
      this.chuShiLingDaoList = res.data;
    });
  }
  private buShiLingDao() {
    this.request('/qingjia/signCreator2', {}).then((res) => {
      this.buShiLingDaoList = res.data;
    });
  }

  private fenGuanLingDao() {
    this.request('/qingjia/signCreator3', {}).then((res) => {
      this.fenGuanLingDaoList = res.data;
    });
  }

  private zhuYaoLingDao() {
    this.request('/qingjia/signCreator4', {}).then((res) => {
      this.zhuYaoLingDaoList = res.data;
    });
  }

  save(){
    this.events.publish(AppConfig.Leave.flow,this.params);
    this.navController.back();
  }

}
