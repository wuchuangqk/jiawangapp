import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Events, NavController} from '@ionic/angular';
import {DialogService} from '../../../service/dialog.service';
import {DomSanitizer} from '@angular/platform-browser';
import {AppConfig} from '../../../app.config';
import {DetailBasePage} from '../../../base/detail-base-page';
import { AlertController } from '@ionic/angular';
import  AlloyFinger  from 'alloyfinger';
// alloyfinger
@Component({
  selector: 'app-receive-detail',
  templateUrl: './receive-detail.component.html',
  styleUrls: ['./receive-detail.component.scss'],
})
export class ReceiveDetailComponent extends DetailBasePage implements OnInit, OnDestroy {

  public title = '详情';
  public isShenPi: boolean;
  public handle_status: string;
  public handleUrl: string;
  public infoTitle: string;
  public isEdit = false;
  public tabIndex = -1;
  public commentList = [];
  public commentShort = '';
  public primarySignerList = [];
  public fenGuanLingDaoList = [];
  public staff_ids = [];
  public ldid = '';
  public primarySignName = '';
  public fenGuanLingDaoNames = '';
  public signList = [];
  // 关联项目
  public linkProjectList = [];
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
      public alertController: AlertController,
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

  async ngOnInit() {
    await this.getDetail(this.payload);
    await this.getCommentList();
    await this.d();
    await this.getPrimarySignerList();
    await this.getFenGuanLingDaoList();
    await this.getSignList();
    await this.getLinkProjectList();
    this.events.subscribe(AppConfig.Document.DocumentDetail, () => {
      this.getDetail(this.payload);
      this.isShenPi = false;
      this.handle_status = '0';
    });
  }
  viewFile(item: IDownFile) {
    this.nav('pdf', item);
  }
  // 打开正文
  openZhengWen() {
    if (!this.zhengWen.fileurl) {
      this.dialogService.alert('无正文！');
      return false;
    }
    if (this.zhengWen.fileurl && this.zhengWen.fileurl.length > 0) {
      this.viewFile(this.zhengWen);
    }
  }
  private async  d() {
    const af = new AlloyFinger(document.getElementById('detail'), {
      touchStart() { },
      touchMove() { },
      touchEnd() { },
      touchCancel() { },
      multipointStart() { },
      multipointEnd() { },
      tap() { },
      doubleTap() {
        console.log('双击');
      },
      longTap() { },
      singleTap() { },
      rotate(evt) {
        console.log(evt.angle);
      },
      pinch(evt) {
        // e.scale代表两个手指缩放的比例
        console.log(evt.zoom);
        evt.target.style.transform = 'scale(' + evt.scale + ')';
      },
      pressMove(evt) {
        console.log(evt.deltaX);
        console.log(evt.deltaY);
      },
      swipe(evt) {
        console.log('swipe' + evt.direction);
      }
    });
  }
  private async  getCommentList() {
    const res = await this.request('/receipt/commentStore', {});
    this.commentList = res.data;
  }

  private async getPrimarySignerList() {
    const res = await this.request('/receipt/signCreator', {});
    this.primarySignerList = res.data;
  }

  private async  getFenGuanLingDaoList() {
    const  res = await  this.request('/staffs/list', {
      depart_id: 17
    });
    this.fenGuanLingDaoList = res.data.staffs;
  }

  private async getSignList() {
    const res = await this.request('/receipt/signlist', {item_id: this.id});
    this.signList = res.data;
    console.log(this.signList);
  }


  ngOnDestroy(): void {
    this.events.unsubscribe(AppConfig.Document.DocumentDetail);
  }


  private async getLinkProjectList() {
    const res = await this.request('/receipt/oarel/' + this.id, {});
    this.linkProjectList = res.data;
  }


  /**
   * 选择分管领导
   */
  async selectFenGuanLingDao() {
    const inputs: any = this.fenGuanLingDaoList.map(item => {
      return {
        name: item.name,
        type: 'checkbox',
        label: item.name,
        value: item.id
      };
    });
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '请选择分管领导',
      inputs,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
            this.staff_ids = [];
            this.fenGuanLingDaoNames = '';
          }
        }, {
          text: '确定',
          handler: (e) => {
            this.staff_ids = e;
            this.fenGuanLingDaoNames = this.fenGuanLingDaoList.filter(item => {
              const id = item.id;
              // @ts-ignore
              return  this.staff_ids.includes(id);
            }).map(item => item.name).join(' ');
          }
        }
      ]
    });
    await alert.present();
  }

  /**
   * 选择主要领导
   */
  async selectPrimarySign() {
    const inputs: any = this.primarySignerList.map(item => {
      return {
        name: item.name,
        type: 'radio',
        label: item.name,
        value: item.id
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
            this.ldid = '';
            this.primarySignName = '';
          }
        }, {
          text: '确定',
          handler: (e) => {
            this.ldid = e;
            const arr = this.primarySignerList.filter(item => item.id === this.ldid);
            if (arr.length > 0) {
              this.primarySignName = arr[0].name;
            }
          }
        }
      ]
    });

    await alert.present();
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
            this.infoTitle = e;
          }
        }
      ]
    });

    await alert.present();
  }
  /**
   * 提交
   */
  async submit() {
    const staff_ids = this.staff_ids.join(',');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userId = userInfo.id;
    if (!this.ldid && !staff_ids) {

      if (userId != 519) {
        this.dialogService.toast('请选择主要领导或者分管领导！');
        return false;
      }
    }
    await this.setRequest('/receipt/anditsave', {
     id: this.id,
     comments: this.infoTitle,
     ldid: this.ldid,
     staff_ids
   });
    this.events.publish(AppConfig.Document.DocumentList);
    this.events.publish(AppConfig.Home.Badge);
    this.events.publish(AppConfig.Synthesize.List);
    // this.dialogService.alert('提交成功!');
    this.dialogService.alert('提交成功!', () => {
      this.navController.back();
    });

  }
  public viewProject(item) {
    item.pid = item.id;
    this.nav('project-detail', item);
  }
  public getCommentShort(e) {
    this.infoTitle = e;
  }
}
