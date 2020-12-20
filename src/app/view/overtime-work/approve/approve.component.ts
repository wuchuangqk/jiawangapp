import { Component, OnInit } from '@angular/core';
import {DetailBasePage} from '../../../base/detail-base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {AlertController, Events} from '@ionic/angular';
import {AppConfig} from '../../../app.config';
import { NavController } from '@ionic/angular';
import {FileService} from '../../../service/FileService';


@Component({
  selector: 'app-detail',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss'],
})
export class ApproveComponent  extends DetailBasePage implements OnInit {
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
  public payload = {
    id: '', // 用印id
    option: '', // 意见
    index: '', // 下一个审批序号
    user: '', // 下一个审批人
  };
  // 1 = 公司负责人，2 = 集团公司分管领导
  public signIndex: number = null;
  // 是集团公司总部直接提交
  public type: string = null;
  // 孙中亚
  isBoss = false;
  isMore = false;

  constructor(
      public http: HttpService,
      public router: Router,
      public navController: NavController,
      public dialogService: DialogService,
      public sanitizer: DomSanitizer,
      public alertController: AlertController,
      public events: Events,
      public fileService: FileService,
      public route?: ActivatedRoute,
  ) {
    super(http, router, dialogService, sanitizer, navController, fileService);
    this.url = this.query('url');
    this.handleUrl = this.query('handleUrl');
    this.id = this.query('id');
    this.payload.id = this.query('id');
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
      this.signIndex = Number(res.data.ShowIndex);
      this.type = res.data.type;
      // tslint:disable-next-line:variable-name
      const _userInfo = localStorage.getItem('userInfo');
      const userInfo = JSON.parse(_userInfo);
      this.isBoss  =
          // Number(res.data.index) === 2 &&
          userInfo.id == 425;
      if (res.data.file) {
        this.fileList = res.data.file;
      }
    });
  }

  getIds(arr): string {
    return arr.map(item => item.id).join(',');
  }

  private async getSignList() {
    const res = await this.request('/jiaban/signlist', {item_id: this.id});
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
            this.payload.option = e;
          }
        }
      ]
    });

    await alert.present();
  }

  // 选下级领导
  async showNextSigner() {
    // ShowIndex = 1
    const signList: any = await this.getSigner();
    const inputs = signList.map(v => {
      return {
        name: v.name,
        type: 'radio',
        label: v.name,
        value: v.id
      };
    });
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '请选择集团公司分管领导',
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
            this.payload.user = e;
            this.payload.index = String(this.signIndex + 1);
          }
        }
      ]
    });
    await alert.present();
  }

  // 终止
  async stop() {
    const alert = await this.alertController.create({
      mode: 'md',
      header: '终止',
      inputs: [
        {
          name: 'comments',
          type: 'text',
          placeholder: '请输入终止意见'
        }
      ],
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
            this.setRequest('/jiaban/shenpi_stop', {
              option: e.comments,
              id: this.id
            })
              .then((res) => {
                this.events.publish(AppConfig.Home.Badge);
                this.events.publish(AppConfig.OvertimeWork.List);
                this.events.publish(AppConfig.OvertimeWork.ShenPiList);
                this.dialogService.alert('提交成功!', () => {
                  this.goBack();
                });
              })
            ;
          }
        }
      ]
    });
    await alert.present();
  }

  back() {
    if (!this.payload.option) {
      this.dialogService.toast('请输入审批意见');
      return;
    }
    this.dialogService.loading('正在提交，请稍候……');
    this.setRequest('/jiaban/shepi_back', this.payload).then((res) => {
      this.dialogService.dismiss();
      this.events.publish(AppConfig.Home.Badge);
      this.events.publish(AppConfig.OvertimeWork.List);
      this.events.publish(AppConfig.OvertimeWork.ShenPiList);
      this.dialogService.alert('提交成功', () => {
        this.goBack();
      });
    });
  }


  save() {
    // 直接提交
    if (this.isBoss) {
      this.doApproval();
      return;
    }
    if (!this.payload.option) {
      this.dialogService.toast('请输入审批意见');
      return;
    }

    if (this.type === '集团公司本部') {
      this.doApproval();
    } else {
      if (this.signIndex === 1 && !this.payload.index) {
        // 选集团公司分管领导
        this.showNextSigner();
      } else {
        // 直接提交
        this.doApproval();
      }
    }


  }

  doApproval() {
    this.dialogService.loading('正在提交，请稍候……');
    this.setRequest('/jiaban/shenpi_save', this.payload).then((res) => {
      this.dialogService.dismiss();
      this.events.publish(AppConfig.Home.Badge);
      this.events.publish(AppConfig.OvertimeWork.List);
      this.events.publish(AppConfig.OvertimeWork.ShenPiList);
      this.dialogService.alert('提交成功', () => {
        this.goBack();
      });
    });
  }

  getSigner() {
    return new Promise(resolve => {
      this.request('/jiaban/signCreator2', {}).then(res => {
        resolve(res.data);
      });
    });
  }
}
