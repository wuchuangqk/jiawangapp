import {Component, OnDestroy, OnInit} from '@angular/core';
import {DetailBasePage} from '../../../base/detail-base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {AlertController, Events, ModalController} from '@ionic/angular';
import {AppConfig} from '../../../app.config';
import {NavController} from '@ionic/angular';
import {FileService} from '../../../service/FileService';
import {SelectFlowComponent} from '../select-flow/select-flow.component';

@Component({
  selector: 'app-detail',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss'],
})
export class ApproveComponent extends DetailBasePage implements OnInit,OnDestroy {
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
    id: '',
    option: '',
    index:'',
    user:''
  };
  // 孙中亚
  isBoss: boolean = false;
  curIndex = null; // 当前步骤
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
    public modalController: ModalController,
    public route?: ActivatedRoute,
  ) {
    super(http, router, dialogService, sanitizer, navController, fileService);
    this.url = this.query('url');
    this.handleUrl = this.query('handleUrl');
    this.id = this.query('id');
    this.payload.id = this.query('id');
    // this.payload.url = this.query('handleUrl');
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
    this.events.subscribe(AppConfig.Leave.flow,(params)=>{
      console.log('params',params);
      this.payload.index = params.index;
      this.payload.user = params.user;
      this.doApproval();
    })
  }

  ngOnDestroy(): void {
    this.events.unsubscribe(AppConfig.Leave.flow);
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
      this.isBoss = Number(res.data.ShowIndex) === 5;
      this.curIndex = Number(res.data.ShowIndex);
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
            this.payload.option = e;
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
    this.dialogService.toast('正在提交数据...');
    this.setRequest('/qingjia/shepi_back', this.payload).then((res) => {
      this.events.publish(AppConfig.Home.Badge);
      this.events.publish(AppConfig.Leave.List);
      this.events.publish(AppConfig.Leave.ShenPiList);
      this.dialogService.alert('提交成功', () => {
        this.goBack();
      });
    });
  }

  async shenpi_over() {
    if (!this.payload.option) {
      this.dialogService.toast('请输入审批意见');
      return;
    }
    this.dialogService.toast('正在提交数据...');
    this.setRequest('/qingjia/shenpi_over', this.payload).then((res) => {
      this.events.publish(AppConfig.Home.Badge);
      this.events.publish(AppConfig.Leave.List);
      this.events.publish(AppConfig.Leave.ShenPiList);
      this.dialogService.alert('提交成功', () => {
        this.goBack();
      });
    });
  }

  save() {
    if (this.isBoss) {
      this.doApproval();
      return;
    }
    if (!this.payload.option) {
      this.dialogService.toast('请输入审批意见');
      return;
    }
    // 判断当前步骤，如果不是最后一步，需要选人
    if(this.curIndex !== 4){
      this.showNextFlow();
    }else{
      this.doApproval();
    }
  }

  async showNextFlow() {
    this.nav('/leave/flow',{
      index:this.curIndex
    })
  }

  doApproval() {
    this.dialogService.toast('正在提交数据...');
    this.setRequest('/qingjia/shenpi_save', this.payload).then((res) => {
      this.events.publish(AppConfig.Home.Badge);
      this.events.publish(AppConfig.Leave.List);
      this.events.publish(AppConfig.Leave.ShenPiList);
      this.dialogService.alert('提交成功', () => {
        this.goBack();
      });
    });
  }
}
