import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../base/base-page';
import {HttpService} from '../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../service/dialog.service';
import {Events, NavController} from '@ionic/angular';
interface JinDuJiHua {
  id: string;
  title: string;
  handle_status_desc: string;
  handle_status: number;
  thestage: string;
}
@Component({
  selector: 'app-jin-du-ji-hua',
  templateUrl: './jin-du-ji-hua.component.html',
  styleUrls: ['./jin-du-ji-hua.component.scss'],
})
export class JinDuJiHuaComponent extends BasePage implements OnInit {
  public DataList: Array<JinDuJiHua> = [

  ];
  public pid = 0;
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
    this.request('/project_details/notelist', {
      pid: this.pid
    }).then((res) => {
      this.DataList = res.data;
    });
  }
  getItem(item: JinDuJiHua) {
    this.request('/project_details/notedetail', {
      noteid: item.id
    }).then((res) => {
      this.dialogService.alert(`
    <section>
            <div margin-top-3 class="ion-text-left">节点名称:${res.data.dataname}</div>
            <div margin-top-3  class="ion-text-left">责任人:${res.data.zrr}</div>
            <div margin-top-3  class="ion-text-left">计划时间:${res.data.jhtime}</div>
            <div margin-top-3  class="ion-text-left">实际时间:${res.data.sjtime}</div>
    </section>`);
    });
  }
}
