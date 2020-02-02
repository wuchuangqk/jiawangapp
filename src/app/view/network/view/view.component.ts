import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {DialogService} from '../../../service/dialog.service';
import {Events, NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../../service/http.service';
import {IndexedDBService} from '../../../service/IndexedDBService';
import {AppConfig} from '../../../app.config';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent extends BasePage implements OnInit {
  public id: number;
  params = {
    name: '',
    ip: ''
  };
  constructor(
      public http: HttpService,
      public router: Router,
      public navController: NavController,
      public dialogService: DialogService,
      public indexedDBService: IndexedDBService,
      public events: Events,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService, route);
    this.id = Number(this.query('id'));
  }

  ngOnInit() {
    this.indexedDBService.read(this.id).then((res: any) => {
      console.log(res);
      this.params = res;
    });
  }
  save() {
    console.log(this.params);
    this.indexedDBService.update(this.params).then(() => {
        this.dialogService.toast('修改成功!');
        this.events.publish(AppConfig.NetWork.list);
        this.navController.back();
    });
  }
  delete() {
    if (Number(localStorage.selectIpId) === this.id) {
      this.dialogService.toast('改网络地址已被选中,不能删除!');
    } else {
      this.indexedDBService.remove(this.id).then(() => {
        this.dialogService.alert('删除成功!', () => {
          this.events.publish(AppConfig.NetWork.list);
          this.navController.back();
        });
      });
    }
  }

}
