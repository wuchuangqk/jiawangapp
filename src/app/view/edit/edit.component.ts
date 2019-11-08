import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../base/base-page';
import {HttpService} from '../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Events, NavController} from '@ionic/angular';
import {DialogService} from '../../service/dialog.service';
import {AppConfig} from '../../app.config';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent extends BasePage implements OnInit {

  public content = '';
  public contentTitle = '';
  public id: string;
  public url: string;
  constructor(
      public http: HttpService,
      public router: Router,
      public navController: NavController,
      public dialogService: DialogService,
      public events: Events,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService);
    this.id = this.query('id');
    this.url = this.query('url');
  }

  ngOnInit() {
    this.getDetail();
  }
  submit() {
    this.setRequest('/work_dynamics/edit', {
      content: this.content,
      id: this.id
    }).then((res) => {
      this.dialogService.toast('编辑成功！');
      this.events.publish(AppConfig.Exchange.view);
      this.navController.back();
    });
  }
  getDetail() {
    this.request(this.url + '/' + this.id, {}).then((res) => {
      this.content = res.data.content;
    });
  }

}
