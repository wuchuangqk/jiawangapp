import { Component, OnInit } from '@angular/core';
import {DetailBasePage} from '../../../base/detail-base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {AlertController, Events} from '@ionic/angular';
import {AppConfig} from '../../../app.config';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent  extends DetailBasePage implements OnInit {
  public title = '详情';
  public isShenPi: boolean;
  public handleUrl: string;
  public tabIndex = 0;
  public content: SafeHtml;
  public selectedStaff = [];
  public commentList = [];
  public isEdit = false;
  public signList = [];
  // 是否已审批
  public isgned = false;
  public payload: {
    url: string;
    id: string;
    comments: string;
    staff_ids: string;
  };

  constructor(
      public http: HttpService,
      public router: Router,
      public navController: NavController,
      public dialogService: DialogService,
      public sanitizer: DomSanitizer,
      public alertController: AlertController,
      public events: Events,
      public route?: ActivatedRoute,
  ) {
    super(http, router, dialogService, sanitizer, navController);
    this.url = this.query('url');
    this.handleUrl = this.query('handleUrl');
    this.id = this.query('id');
    this.payload.id = this.query('id');
    this.payload.url = this.query('handleUrl');
    this.isShenPi = this.getQueryParams().isShenPi;
    this.title = this.query('title');
    this.getIsBackToHome();
  }

  async ngOnInit() {
    await this.getDetail();
    await this.getCommentList();
    await this.getSignList();
    this.events.subscribe(AppConfig.Document.DocumentDetail, () => {
      this.getDetail();
    });
  }

  private async getCommentList() {
    const res = await this.request('/receipt/commentStore', {});
    this.commentList = res.data;
  }

  go(eventName, selectedStaff, isSelectOne) {
    localStorage.num = 0;
    this.nav('/receive-document/staff-select/0000', {
      title: '选择人员', url: 'bbb', depart_id: '0000',
      isSelectOne,
      eventName,
      selected_staff: JSON.stringify(selectedStaff),
      selectedStaff: JSON.stringify(selectedStaff)
    });
  }

  public getDetail() {
    return this.request(this.url + '/' + this.id, {}).then((res) => {
      this.content = this.transform(res.data.json);
      this.isgned = res.data.isgned;
      if (res.data.file) {
        this.fileList = res.data.file;
      }
    });
  }

  getIds(arr): string {
    return arr.map(item => item.id).join(',');
  }

  private async getSignList() {
    const res = await this.request('/qingjia/signlist', {item_id: this.id});
    this.signList = res.data;
  }

  /**
   * 选择快捷语
   */
  async presentAlertPrompt() {
    const inputs: any = this.commentList.map(item => {
      return {
        name: item.name,
        type: 'radio',
        label: item.name,
        value: item.name
      };
    });
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '请选择快捷语!',
      inputs,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '确定',
          handler: (e) => {
            this.payload.comments = e;
          }
        }
      ]
    });

    await alert.present();
  }

  back() {
    if (!this.payload.comments) {
      this.dialogService.toast('请输入审批意见');
      return;
    }
    this.dialogService.toast('正在提交数据...');
    this.setRequest("/zhsp/backsave", this.payload).then((res) => {
      this.events.publish(AppConfig.Home.Badge);
      this.events.publish(AppConfig.Synthesize.List);
      this.events.publish(AppConfig.Synthesize.ShenPiList);
      this.dialogService.alert('提交成功', () => {
        this.goBack();
      });
    });
  }


  save() {
    if (!this.payload.comments) {
      this.dialogService.toast('请输入审批意见');
      return;
    }
    this.dialogService.toast('正在提交数据...');
    this.setRequest(this.payload.url, this.payload).then((res) => {
      this.events.publish(AppConfig.Home.Badge);
      this.events.publish(AppConfig.Synthesize.List);
      this.events.publish(AppConfig.Synthesize.ShenPiList);
      this.dialogService.alert('提交成功', () => {
        this.goBack();
      });
    });
  }
}
