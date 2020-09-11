import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {HttpService} from '../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Events, NavController} from '@ionic/angular';
import {DialogService} from '../../service/dialog.service';
import {AppConfig} from '../../app.config';
import {DetailBasePage} from '../../base/detail-base-page';
import {FileService} from "../../service/FileService";

@Component({
  selector: 'app-shang-pu-guan-li-detail',
  templateUrl: './shang-pu-guan-li-detail.component.html',
  styleUrls: ['./shang-pu-guan-li-detail.component.scss'],
})
export class ShangPuGuanLiDetailComponent extends DetailBasePage implements OnInit {

  public title = '详情';
  public isShenPi: boolean;
  public handleUrl: string;
  public content: SafeHtml;
  public selectedStaff = [];
  public payload: {
    istongyi: string;
    url: string;
    spid: string;
    comments: string;
    staff_ids: string;
  };
  public itemDetail: any = {};
  public DetailList: Array<IListItem> = [
    {label: '房产名称', field: 'fcname'},
    { label: '报修编号', field: 'bianhao'},
    { label: '报修人', field: 'baoxinren'},
    { label: '报修时间', field: 'bxtime' },
    { label: '报修部位', field: 'bxbw' },
    { label: '报修内容', field: 'beizu'},
    { label: '预计完成时间', field: 'yjtime'},
    { label: '预计费用', field: 'yjfy'},
    { label: '相关文件', field: 'fj' }
  ];
  constructor(
      public http: HttpService,
      public router: Router,
      public navController: NavController,
      public dialogService: DialogService,
      public sanitizer: DomSanitizer,
      public events: Events,
      public fileService: FileService,
      public route?: ActivatedRoute,
  ) {
    super( http, router, dialogService, sanitizer, navController,fileService);
    this.url = '/zichan/shangpudetail';
    this.handleUrl = this.query('handleUrl');
    this.id = this.query('id');
    this.payload.spid = this.query('id');
    this.payload.url = this.query('handleUrl');
    this.isShenPi = this.getQueryParams().isShenPi;
    this.title = this.query('title');
  }

  ngOnInit() {
    this.getDetail();
    this.events.subscribe(AppConfig.Document.DocumentDetail, () => {
      this.getDetail();
    });
  }
  public getDetail() {
    return  this.request(this.url, {
      item_id: this.id
    }).then((res) => {
      this.itemDetail = res.data;
      this.content = res.data.json;
      this.fileList = res.data.file;
    });
  }
}
