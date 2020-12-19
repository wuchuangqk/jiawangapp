import {Component, OnInit} from '@angular/core';
import {DetailBasePage} from '../../../base/detail-base-page';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, Events, NavController,ModalController} from '@ionic/angular';
import {DialogService} from '../../../service/dialog.service';
import {JPushModel} from '../../home/jPush.model';
import {FileService} from '../../../service/FileService';
import {AppConfig} from '../../../app.config';
import {NextFlowComponent} from '../next-flow/next-flow.component';
import {promise} from 'selenium-webdriver';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.scss'],
})
export class ApprovalComponent extends DetailBasePage implements OnInit {

  public title = '详情';
  public isShenPi: boolean;
  public handleUrl: string;
  public tabIndex = 0;
  public content: SafeHtml;
  public selectedStaff = [];
  public commentList = [];
  public isEdit = false;
  public signList:any = [];
  public payload = {
    id:'', // 用印id
    option:'', // 意见
    index:'', // 下一个审批序号
    staff_ids:'', // 下一个审批人
  };
  isMore:boolean = false;
  isCommentOpen:boolean = false;
  currid = null; // 当前步骤
  signIndex = null;
  nextid = null; // nextid = 0 标识是最后一步
  constructor(
    public http: HttpService,
    public router: Router,
    public navController: NavController,
    public dialogService: DialogService,
    public sanitizer: DomSanitizer,
    public events: Events,
    public alertController: AlertController,
    public jPushModel: JPushModel,
    public fileService: FileService,
    public modalController: ModalController,
    public route?: ActivatedRoute,
  ) {
    super( http, router, dialogService, sanitizer, navController,fileService);
    this.url = this.query('url');
    this.title = this.query('title');
    this.handleUrl = this.query('handleUrl');
    this.payload.id = this.query('id');
    this.isShenPi = this.getQueryParams().isShenPi;
    this.getIsBackToHome();
  }

  async ngOnInit() {
    await this.getDetail();
    await this.getSignList();
  }

  public getDetail() {
    return  this.request(this.url, {
      item_id: this.payload.id
    }).then((res) => {
      this.content = this.transform(res.data.json);
      this.zhengWen = res.data.pdfurl;
      this.currid = res.data.currid;
      this.nextid = Number(res.data.nextid)
    });
  }

  /********************
   * 退回
   ********************/
  /*public async document_back(){
    let alert = await this.alertController.create({
      mode:'md',
      header: '退回',
      inputs: [
        {
          name: 'comments',
          type: 'text',
          placeholder: '退回意见'
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
            this.setRequest('/zhifu/shepi_back', {
              option: e.comments,
              id:this.id
            })
              .then((res)=>{
                this.events.publish(AppConfig.Home.Badge);
                this.events.publish(AppConfig.ZiJinZhiFu.List);
                this.events.publish(AppConfig.ZiJinZhiFu.ShenPiList);
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
  }*/

  // 退回
  back(){
    if(!this.payload.option){
      this.dialogService.toast('请输入退回意见');
      return;
    }
    this.dialogService.loading('正在提交，请稍候……');
    this.setRequest("/zhifu/shepi_back", this.payload).then((res) => {
      this.dialogService.dismiss();
      this.events.publish(AppConfig.Home.Badge);
      this.events.publish(AppConfig.ZiJinZhiFu.List);
      this.events.publish(AppConfig.ZiJinZhiFu.ShenPiList);
      this.dialogService.alert('提交成功',()=>{
        this.goBack();
      });
    });
  }

  /********************
   * 加签
   ********************/
  public async document_jiaqian(isJiaQian){
    this.nav("zi-jin-zhi-fu/jia-qian",{
      signtype:this.currid,
      id:this.payload.id
    })
    // this.currentModal = await this.modalController.create({
    //   component:JiaQianComponent,
    //   showBackdrop:true,
    //   componentProps:{
    //     id:this.id,
    //     signIndex: this.SignIndex,
    //     isJiaQian
    //   }
    // });
    // await this.currentModal.present();
    // //监听销毁的事件，接收返回的值
    // const { data } = await this.currentModal.onDidDismiss();
    // console.log(data);
    // if(data.isBack){
    //   this.navController.back();
    // }
  }


  /********************
   *终止
   ********************/
  public async document_stop(){
    let alert = await this.alertController.create({
      mode:'md',
      header: '终止',
      inputs: [
        {
          name: 'comments',
          type: 'text',
          placeholder: '终止意见'
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
            this.setRequest('/zhifu/shepi_stop', {
              option: e.comments,
              id:this.payload.id
            })
              .then((res)=>{
                this.events.publish(AppConfig.Home.Badge);
                this.events.publish(AppConfig.ZiJinZhiFu.List);
                this.events.publish(AppConfig.ZiJinZhiFu.ShenPiList);
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

  // 流程
  private async getSignList() {
    this.request('/zhifu/signlist',{item_id: this.payload.id}).then(res=>{
      this.signList = res.data;
    })
  }


  ngOnDestroy(): void {
    this.events.unsubscribe(AppConfig.Document.DocumentDetail);
  }

  go(eventName) {
    localStorage.num = 0;
    this.nav('/receive-document/staff-select/0000', {
      title: '选择人员', url: 'bbb', depart_id: '0000',
      isSelectOne: false,
      eventName,
      selected_staff : JSON.stringify(this.selectedStaff),
      selectedStaff : JSON.stringify(this.selectedStaff)
    });
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

  // 打开正文
  openZhengWen() {
    if (!this.zhengWen || !this.zhengWen.fileurl) {
      this.dialogService.alert('无正文！');
      return false;
    }
    if (this.zhengWen.fileurl && this.zhengWen.fileurl.length > 0) {
      this.viewFile(this.zhengWen);
    }

  }

  /**
   * 提交
   */
  async submit() {
    if(!this.payload.option){
      this.dialogService.toast('请输入审批意见');
      return;
    }
    if(this.nextid !== 0){
      this.showNextSigner();
    }else{
      // this.payload.index = String(Number(this.currid)+1);
      // this.payload.staff_ids = '';
      this.dialogService.loading('正在提交，请稍候……');
      this.setRequest('/zhifu/shenpi_save', this.payload).then((res) => {
        this.dialogService.dismiss();
        this.events.publish(AppConfig.Home.Badge);
        this.events.publish(AppConfig.ZiJinZhiFu.List);
        this.events.publish(AppConfig.ZiJinZhiFu.ShenPiList);
        this.dialogService.alert('提交成功',()=>{
          this.goBack();
        });
      });
    }
    /*this.dialogService.loading('正在提交，请稍候……');
    this.setRequest('/zhifu/shenpi_save', this.payload).then((res) => {
      this.dialogService.dismiss();
      this.events.publish(AppConfig.Home.Badge);
      this.events.publish(AppConfig.ZiJinZhiFu.List);
      this.events.publish(AppConfig.ZiJinZhiFu.ShenPiList);
      this.dialogService.alert('提交成功',()=>{
        this.goBack();
      });
    });*/

  }

  getNextSigner(){
    return new Promise(resolve => {
      this.request('/zhifu/getSignCreator', {signtype: this.currid}).then(res => {
        resolve(res.data)
      })
    })

  }

  async showNextSigner(){
    // signIndex:1 = 处室，处室 => 分管 => 党委
    const signList:any = await this.getNextSigner();
    console.log('signList',signList);
    const inputs = signList.map(v => {
      return {
        name: v.name,
        type: 'checkbox',
        label: v.name,
        value: v.id
      }
    });
    const header = '请选择下个流程的执行人';
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
            console.log('showNextSigner',e);
            if(!e.length){
              this.dialogService.toast('请选择流程执行人');
              return
            }
            this.payload.index = this.nextid;
            this.payload.staff_ids = e.join(',');
            this.dialogService.loading('正在提交，请稍候……');
            this.setRequest('/zhifu/shenpi_save', this.payload).then((res) => {
              this.dialogService.dismiss();
              this.events.publish(AppConfig.Home.Badge);
              this.events.publish(AppConfig.ZiJinZhiFu.List);
              this.events.publish(AppConfig.ZiJinZhiFu.ShenPiList);
              this.dialogService.alert('提交成功',()=>{
                this.goBack();
              });
            });
          }
        }
      ]
    });
    await alert.present();
  }


  // 选人
  async selectNext(){
    const modal = await this.modalController.create({
      component:NextFlowComponent,
      cssClass: 'my-custom-class',
    });
    await modal.present();
/*    const modal = await this.modalController.create({
      component: StaffSelectComponent,
      cssClass: 'my-custom-class',
      componentProps:{
        title: '选择人员', url: 'bbb', depart_id: '0000',
        isSelectOne: false,
        eventName,
        selected_staff: selected,
        selectedStaff:selected
      }
    });
    // return
    await modal.present();*/
  }

}
