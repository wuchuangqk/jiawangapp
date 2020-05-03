import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {AlertController, Events} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import {DetailBasePage} from '../../base/detail-base-page';
import {HttpService} from '../../service/http.service';
import {DialogService} from '../../service/dialog.service';
import {AppConfig} from '../../app.config';


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
  public payload: {
    url: string;
    runid: string;
    // 处理意见
    opinion: string;
    staff_ids: string;
    stepid: string;
    // 当前步奏
    current_step: string;
    manage: string;
  };
  public action: {
    savenext: string;
    linshisave: string;
    tuihui: string;
    finish: string;
    stop: string;
  } = {
    savenext: '0',
    linshisave: '0',
    tuihui: '0',
    finish: '0',
    stop: '0'
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
  public nextStepUserList = [];
  public backUserList = [];
  constructor(
    public http: HttpService,
    public router: Router,
    public navController: NavController,
    public dialogService: DialogService,
    public sanitizer: DomSanitizer,
    public events: Events,
    public alertController: AlertController,
    public route?: ActivatedRoute,
  ) {
    super( http, router, dialogService, sanitizer, navController);
    this.url = '/flowrun/tododetail';
    this.handleUrl = this.query('handleUrl');
    this.id = this.query('id');
    this.payload.runid = this.query('id');
    this.payload.url = this.query('handleUrl');
    this.isShenPi = this.getQueryParams().isShenPi;
    this.title = this.query('title');
  }

  ngOnInit() {
    this.getDetail();
    this.getNextUser();
    this.getBackUserList();
    this.events.subscribe(AppConfig.Document.DocumentDetail, () => {
      this.getDetail();
    });
  }
  public getDetail() {
    return  this.request(this.url, {
      item_id: this.id
    }).then((res) => {
      this.content = this.transform(res.data.content);
      this.itemDetail = res.data;
      this.payload.current_step = res.data.current_step;
      this.payload.opinion = res.data.opinion;
      this.payload.manage = res.data.manage;
      this.action = res.data.action;
    });
  }
  // 获取下一步流转名单
  getNextUser() {
      this.request('/flowrun/getnextuser', this.payload).then((res) => {
          this.nextStepUserList = [];
          for (const item of res.data.step) {
            this.nextStepUserList .push({
              type: 'radio',
              label: item.step_name,
              value: item.step_id,
            });
          }
      });
  }
  // 获取退回名单
  getBackUserList() {
    this.request('/flowrun/gettuiuser', this.payload).then((res) => {
      this.backUserList = [];
      for (const item of res.data) {
        this.backUserList .push({
          type: 'radio',
          label: item.step_name,
          value: item.step_id,
        });
      }
    });
  }
  shenPiTuiHui() {
    if (!this.payload.opinion) {
      this.dialogService.toast('请输入审批意见');
      return;
    }
    this.presentBackUserAlertRadio();

  }
  // 临时保存
  linShiBaoChun() {
    if (!this.payload.opinion) {
      this.dialogService.toast('请输入审批意见');
      return;
    }
    this.dialogService.toast('正在提交数据...');
    this.request('/flowrun/handlelinshisign', this.payload).then((res) => {
      this.dialogService.toast('提交成功');
      this.events.publish(AppConfig.Synthesize.List);
      this.events.publish(AppConfig.Synthesize.ShenPiList);
      this.navController.back();
    });
  }

  async presentNextUserAlertRadio() {
    const alert = await this.alertController.create({
      header: '选择审批下一步',
      inputs: this.nextStepUserList,
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
          handler: (stepId) => {
            this.payload.stepid = stepId;
            this.dialogService.toast('正在提交数据...');
            this.request('/flowrun/handlesignNext', this.payload).then((res) => {
              this.dialogService.toast('提交成功');
              this.events.publish(AppConfig.Synthesize.List);
              this.events.publish(AppConfig.Synthesize.ShenPiList);
              this.navController.back();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  // 审批退回选择退回名单弹出框
  async presentBackUserAlertRadio() {
    const alert = await this.alertController.create({
      header: '选择审批下一步',
      inputs: this.backUserList,
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
          handler: (r) => {
            this.payload.stepid = r;
            this.request('/flowrun/tuihandsige', this.payload).then((res) => {
              this.dialogService.toast('提交成功');
              this.events.publish(AppConfig.Synthesize.List);
              this.events.publish(AppConfig.Synthesize.ShenPiList);
              this.navController.back();
            });
          }
        }
      ]
    });

    await alert.present();
  }
  // 审批终止
  shenPiZongZhi() {
    if (!this.payload.opinion) {
      this.dialogService.toast('请输入审批意见');
      return;
    }
    this.dialogService.toast('正在提交数据...');
    this.request('/flowrun/stopsige', this.payload).then((res) => {
      this.dialogService.toast('提交成功');
      this.events.publish(AppConfig.Synthesize.List);
      this.events.publish(AppConfig.Synthesize.ShenPiList);
      this.navController.back();
    });
  }
  // 结束流程
  jieShuLiuCheng() {
    if (!this.payload.opinion) {
      this.dialogService.toast('请输入审批意见');
      return;
    }
    this.dialogService.toast('正在提交数据...');
    this.request('/flowrun/finishsige', this.payload).then((res) => {
      this.dialogService.toast('提交成功');
      this.events.publish(AppConfig.Synthesize.List);
      this.events.publish(AppConfig.Synthesize.ShenPiList);
      this.navController.back();
    });
  }
  saveAndNext() {
    if (!this.payload.opinion) {
      this.dialogService.toast('请输入审批意见');
      return;
    }
    this.presentNextUserAlertRadio();


  }
  save() {
    if (!this.payload.opinion) {
      this.dialogService.toast('请输入审批意见');
      return;
    }
    this.dialogService.toast('正在提交数据...');
    this.request('/flowrun/handlelinshisign', this.payload).then((res) => {
      this.dialogService.toast('提交成功');
      this.events.publish(AppConfig.Synthesize.List);
      this.events.publish(AppConfig.Synthesize.ShenPiList);
      this.navController.back();
    });
  }
}
