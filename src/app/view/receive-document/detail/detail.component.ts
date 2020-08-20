import {Component, OnDestroy, OnInit} from '@angular/core';
import {DetailBasePage} from '../../../base/detail-base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import { DomSanitizer } from '@angular/platform-browser';
import {Events} from '@ionic/angular';
import {AppConfig} from '../../../app.config';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
// @ts-ignore
export class DetailComponent  extends DetailBasePage implements OnInit, OnDestroy {
  public title = '详情';
  public isShenPi: boolean;
  // tslint:disable-next-line:variable-name
  public handle_status: string;
  public handleUrl: string;
  public infoTitle: string;
  public isEdit = false;
  public payload: {
    document_type: string
  };
  constructor(
      public http: HttpService,
      public router: Router,
      public navController: NavController,
      public dialogService: DialogService,
      public sanitizer: DomSanitizer,
      public events: Events,
      public route?: ActivatedRoute,
  ) {
    super( http, router, dialogService, sanitizer, navController);
    this.url = this.query('url');
    this.title = this.query('title');
    this.handleUrl = this.query('handleUrl');
    this.handle_status = this.query('handle_status');
    this.id = this.query('id');
    this.isShenPi = this.getQueryParams().isShenPi;
    this.payload.document_type = this.query('document_type');
  }

  ngOnInit() {
    this.getDetail(this.payload);
    this.events.subscribe(AppConfig.Document.DocumentDetail, () => {
      this.getDetail(this.payload);
      this.isShenPi = false;
      this.handle_status = '0';
    });
  }
  viewFile(item: IDownFile) {
    this.nav('pdf', item);
  }
  ngOnDestroy(): void {
    this.events.unsubscribe(AppConfig.Document.DocumentDetail);
  }
}
