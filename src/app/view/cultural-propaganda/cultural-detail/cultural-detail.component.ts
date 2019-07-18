import { Component, OnInit } from '@angular/core';
import {DetailBasePage} from '../../../base/detail-base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import {DomSanitizer} from '@angular/platform-browser';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-cultural-detail',
  templateUrl: './cultural-detail.component.html',
  styleUrls: ['./cultural-detail.component.scss'],
})
export class CulturalDetailComponent extends DetailBasePage implements OnInit {
  public contentTitle = '';
  constructor(
      public http: HttpService,
      public router: Router,
      public dialogService: DialogService,
      public sanitizer: DomSanitizer,
      public navController: NavController,
      public route?: ActivatedRoute,
  ) {
    super(http, router, dialogService, sanitizer, navController);
    this.id = this.query('id');
    this.title = '文化宣传';
  }

  ngOnInit() {
    this.request(`/notices/wenxuan_detail/${this.id}`, {}).then((res) => {
      this.contentTitle = res.data.infoTitle;
      this.content = this.transform(res.data.content);
    });
  }

}
