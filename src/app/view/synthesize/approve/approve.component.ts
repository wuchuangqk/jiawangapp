import { Component, OnInit } from '@angular/core';
import {DetailBasePage} from '../../../base/detail-base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {AlertController, Events} from '@ionic/angular';
import {AppConfig} from '../../../app.config';
import { NavController } from '@ionic/angular';
import {FileService} from "../../../service/FileService";


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
  public payload = {
    id:'', // 用印id
    option:'', // 意见
    index:'', // 下一个审批序号
    user:'', // 下一个审批人
  };

  // 0 = 王晴，1 = 业务部室，2 = 分管领导，3 = 党委书记
  public signIndex: number = null;
  // 单步骤(标识是王晴)
  isSingle: boolean = false;
  isMore:boolean = false;

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
    super( http, router, dialogService, sanitizer, navController,fileService);
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
  }
  private async  getCommentList() {
    const res = await this.request('/receipt/commentStore', {});
    this.commentList = res.data;
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
      return  this.request(this.url + '/' + this.id, {}).then((res) => {
        this.content = this.transform(res.data.json);
        this.signIndex = Number(res.data.index);
        // this.isSingle = this.signIndex === 4;
        // 王晴
        if(this.signIndex === 4){
          this.isSingle = true;
        }
        if (res.data.file) {
          this.fileList = res.data.file;
        }
      });
  }
  getIds(arr): string {
    return  arr.map(item => item.id).join(',');
  }

  private async getSignList() {
    const res = await this.request('/zhsp/signlist', {item_id: this.id});
    this.signList = res.data;
    // this.isSingle = this.signList.length === 1
    // 王晴
    if(this.signList.length === 1){
      this.isSingle = true;
    }
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
  async showNextSigner(){
    // signIndex:1 = 处室，处室 => 分管 => 党委
    const signList:any = this.signIndex == 1 ? await this.getSigner1() : await this.getSign2();
    console.log('signList',signList);
    const inputs = signList.map(v => {
      return {
        name: v.name,
        type: 'radio',
        label: v.name,
        value: v.id
      }
    });
    const header = this.signIndex == 1 ? '请选择分管领导' : '请选择党委书记';
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header,
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
    this.setRequest("/zhsp/shepi_back", this.payload).then((res) => {
      this.dialogService.dismiss();
      this.events.publish(AppConfig.Home.Badge);
      this.events.publish(AppConfig.Synthesize.List);
      this.events.publish(AppConfig.Synthesize.ShenPiList);
      this.dialogService.alert('提交成功',()=>{
        this.goBack();
      });
    });
  }

  // 办结
  public async end(){
    let alert = await this.alertController.create({
      mode:'md',
      header: '办结!',
      message:"注意：办结操作无法撤销",
      inputs: [
        {
          name: 'comments',
          type: 'text',
          placeholder: '办结意见'
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
            this.setRequest('/zhsp/shenpi_over', {
              id:this.id,
              option: e.comments,
            })
              .then((res)=>{
                this.events.publish(AppConfig.Home.Badge);
                this.events.publish(AppConfig.Synthesize.List);
                this.events.publish(AppConfig.Synthesize.ShenPiList);
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

  save() {
    if (!this.payload.option) {
      this.dialogService.toast('请输入审批意见');
      return;
    }
    // 王晴
    if(this.signIndex === 0 || this.signIndex === 4){
      // 提交
      this.doApproval()
    }else {
      // 党委书记（最后一步）
      if(this.signIndex === 3){
        this.doApproval();
      }else{
        // 选择下一步
        if(!this.payload.index && !this.payload.user){
          this.payload.index = String(this.signIndex + 1);
          this.showNextSigner();
        }else{
          this.doApproval();
        }
      }
    }
    /*this.dialogService.toast('正在提交数据...');
    this.setRequest(this.payload.url, this.payload).then((res) => {
      this.events.publish(AppConfig.Home.Badge);
      this.events.publish(AppConfig.Synthesize.List);
      this.events.publish(AppConfig.Synthesize.ShenPiList);
      this.dialogService.alert('提交成功',()=>{
        this.goBack();
      });
    });*/
  }

  doApproval(){
    console.log(this.payload);
    this.dialogService.loading('正在提交，请稍候……');
    this.setRequest('/zhsp/shenpi_save', this.payload).then((res) => {
      this.dialogService.dismiss();
      this.events.publish(AppConfig.Home.Badge);
      this.events.publish(AppConfig.Synthesize.List);
      this.events.publish(AppConfig.Synthesize.ShenPiList);
      this.dialogService.alert('提交成功',()=>{
        this.goBack();
      });
    });
  }

  // 获取分管领导下拉框
  getSigner1(){
    return new Promise(resolve => {
      this.request('/zhsp/signCreator2',{}).then(res=>{
        resolve(res.data)
      })
    })
  }

  // 获取党委书记下拉框
  getSign2(){
    return new Promise(resolve => {
      this.request('/zhsp/signCreator3',{}).then(res=>{
        resolve(res.data)
      })
    })
  }

}
