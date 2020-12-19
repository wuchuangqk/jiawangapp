import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Events} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import {DetailBasePage} from '../../base/detail-base-page';
import {HttpService} from '../../service/http.service';
import {DialogService} from '../../service/dialog.service';
import {AppConfig} from '../../app.config';
import {FileService} from '../../service/FileService';


@Component({
  selector: 'app-detail',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss'],
})
export class ApproveComponent  extends DetailBasePage implements OnInit {
  public title = '详情';
  public isShenPi: boolean;
  public handleUrl: string;
  public content: SafeHtml;
  public selectedStaff = [];
  public isTongYi = true;
  public payload: {
    istongyi: string;
    url: string;
    spid: string;
    comments: string;
    staff_ids: string;
  };
  public itemDetail = {};
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
    super( http, router, dialogService, sanitizer, navController, fileService);
    this.url = '/zichan/shepidetail';
    this.handleUrl = this.query('handleUrl');
    this.id = this.query('id');
    this.payload.spid = this.query('id');
    this.payload.url = this.query('handleUrl');
    this.isShenPi = this.getQueryParams().isShenPi;
    this.title = this.query('title');
    this.getIsBackToHome();
  }

  ngOnInit() {
    this.getDetail();
    this.events.subscribe(AppConfig.Document.DocumentDetail, () => {
      this.getDetail();
    });
  }
  segmentChanged(a) {
    console.log(a);
  }
  go( eventName, selectedStaff, isSelectOne) {
    localStorage.num = 0;
    this.nav('/receive-document/staff-select/0000', {
      title: '选择人员', url: 'bbb', depart_id: '0000',
      isSelectOne,
      eventName,
      selected_staff : JSON.stringify(selectedStaff),
      selectedStaff : JSON.stringify(selectedStaff)
    });
  }
  public getDetail() {
    return  this.request(this.url, {
      id: this.id
    }).then((res) => {
      // this.content = this.transform(res.data);
      this.itemDetail = res.data;
    });
  }

    save() {
    if (!this.payload.comments) {
      this.dialogService.toast('请输入审批意见');
      return;
    }
    this.payload.staff_ids = this.getIds(this.selectedStaff);
    console.log(this.selectedStaff);
    this.payload.istongyi = this.isTongYi ? '同意' : '不同意';
    this.dialogService.toast('正在提交数据...');
    this.setRequest('/zichan/todoshepi', this.payload).then((res) => {
      this.dialogService.toast('提交成功');
      this.events.publish(AppConfig.Synthesize.List);
      this.events.publish(AppConfig.Synthesize.ShenPiList);
      this.goBack();
    });
  }
}
