import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, Events, ModalController, NavController} from '@ionic/angular';
import {DialogService} from '../../../service/dialog.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {AppConfig} from '../../../app.config';
import {DetailBasePage} from '../../../base/detail-base-page';
import {FileService} from "../../../service/FileService";
import {ChuanYueComponent} from "../chuan-yue/chuan-yue.component";
import {JiaQianComponent} from "../jia-qian/jia-qian.component";
import {JPushModel} from "../../home/jPush.model";

@Component({
  selector: 'app-receive-handle',
  templateUrl: './receive-handle.component.html',
  styleUrls: ['./receive-handle.component.scss'],
})
export class ReceiveHandleComponent  extends DetailBasePage implements OnInit, OnDestroy  {
  public isCommentOpen=false;

  public currentModal = null;
  public title = '详情';
  public isShenPi: boolean;
  public handle_status: string;
  public handleUrl: string;
  public infoTitle: string;
  public isEdit = false;
  public isMore = false;
  public tabIndex = -1;
  public commentList = [];
  public commentShort = '';
  public primarySignerList = [];
  public fenGuanLingDaoList = [];
  public staff_ids = [];
  public ldid = '';
  public primarySignName = '';
  public fenGuanLingDaoNames = '';
  public signList:SafeHtml = "";

  public isQianPi:boolean=false;
  //操作日志列表
  public signLogList=[];
  public selectedStaff = [];
  // 关联项目
  public linkProjectList = [];
  // 关联收文
  public linkReceiptList = [];
  // 关联发文
  public linkDispathList = [];
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
      public fileService: FileService,
      public jPushModel: JPushModel,
      public modalController: ModalController,
      public route?: ActivatedRoute,
  ) {
    super( http, router, dialogService, sanitizer, navController,fileService);
    this.url = this.query('url');
    this.title = this.query('title');
    this.handleUrl = this.query('handleUrl');
    this.handle_status = this.query('handle_status');
    this.id = this.query('id');
    this.isShenPi = this.getQueryParams().isShenPi;
    this.payload.document_type = this.query('document_type');
    this.getIsBackToHome();
  }

  async ngOnInit() {
    await this.getDetail(this.payload);
    await this.getCommentList();
    await this.getPrimarySignerList();
    await this.getFenGuanLingDaoList();
    await this.getSignList();
    await this.getLinkProjectList();
    await this.getSingLog();
    this.getUserId();
    this.events.subscribe(AppConfig.Document.DocumentDetail, () => {
      this.getDetail(this.payload);
      this.isShenPi = false;
      this.handle_status = '0';
    });
  }
  viewFile(item: IDownFile) {
    this.nav('pdf', item);
  }



  doDaiBan(item) {
    const id = item.id;
    const type = item.activityname;
    const itemTitle = '';
    const contentTitle = '';
    this.jPushModel.goToPage(id,type,contentTitle,itemTitle);
  }


  /*****************
   * 选择快捷语
   * **************/
  private async  getCommentList() {
    const res = await this.request('/receipt/commentStore', {});
    this.commentList = res.data;
  }

  private async getPrimarySignerList() {
    const res = await this.request('/receipt/signCreator', {});
    this.primarySignerList = res.data;
  }

  public async getSingLog(){
    let res = await this.request("/dispatch/signlog",{docid:this.id})
    this.signLogList = res.data;
  }
  private async  getFenGuanLingDaoList() {
    const  res = await  this.request('/staffs/list', {
      depart_id: 17
    });
    this.fenGuanLingDaoList = res.data.staffs;
  }

  /********************
   * 减签
   ********************/
  public async document_jianqian(){
    this.nav("send-document/jian-qian",{
      id:this.id
    })
  }
  public async document_back(){
    let alert = await this.alertController.create({
      mode:'md',
      // header: '退回!',
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
            this.setRequest('/dispatch/signback', {
              comments: e.comments,
              id:this.id
            })
            .then((res)=>{
              this.events.publish(AppConfig.Document.DocumentList);
              this.events.publish(AppConfig.Home.Badge);
              this.events.publish(AppConfig.Synthesize.List);
              this.dialogService.alert('提交成功!', () => {
                this.goBack();
              });
            })
            ;
          }
        }
      ]
    })
    await alert.present();
  }


  // 传阅
  public async document_chaunYue(){
    this.nav("send-document/chuan-yue",{id:this.id})
  }
  dismissModal() {
    if (this.currentModal) {
      this.currentModal.dismiss().then(() => { this.currentModal = null; });
    }
  }
  public async document_stop(){
    let alert = await this.alertController.create({
      mode:'md',
      // header: '退回!',
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
            this.setRequest('/dispatch/signstop', {
              comments: e.comments,
              id:this.id
            })
            .then((res)=>{
              this.events.publish(AppConfig.Document.DocumentList);
              this.events.publish(AppConfig.Home.Badge);
              this.events.publish(AppConfig.Synthesize.List);
              this.dialogService.alert('提交成功!', () => {
                this.goBack();
              });
            })
            ;
          }
        }
      ]
    })
    await alert.present();
  }



  private async getSignList() {
    const res = await this.request('/dispatch/signlist', {item_id: this.id});
    this.signList = this.transform(res.data.json);
    console.log(this.signList);
  }


  ngOnDestroy(): void {
    this.events.unsubscribe(AppConfig.Document.DocumentDetail);
  }


  private async getLinkProjectList() {
    const res = await this.request('/dispatch/oarel/' + this.id, {});
    this.linkProjectList = res.data.result;
    this.linkReceiptList = res.data.receipt;
    this.linkDispathList = res.data.dispath;
  }

  public async document_jiaqian(isJiaQian,comments){
    this.currentModal = await this.modalController.create({
      component:JiaQianComponent,
      showBackdrop:true,
      componentProps:{
        id:this.id,
        sgUser:this.sgUser,
        qfUser:this.qfUser,
        hgUser:this.hgUser,
        signIndex: this.SignIndex,
        isJiaQian
      }
    });
    await this.currentModal.present();
    //监听销毁的事件，接收返回的值
    const { data } = await this.currentModal.onDidDismiss();
    console.log(data);
    if(data.isBack){
        this.navController.back();
    }
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


  /*
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
   * 选择快捷语
   */
  async qianFaPresentAlertPrompt() {
    let res =  await this.request("/dispatch/signCreator1",{})
    let qianFaList = res.data;
    const inputs: any = qianFaList.map(item => {
      return {
        name: item.name,
        type: 'radio',
        label: item.name,
        value: item.id,
      };
    });
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '请选择签发人员!',
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




  /**
   * 关联收文查看
   */
  public viewReceipt(item) {
    item.pid = item.id;
    item.url = '/receipt/anditdetail';
    item.title = '收文系统';
    this.nav('/receive-document/receive-detail/' + item.id, item);
  }

  /**
   * 关联发文查看
   */
  public viewFaWen(item) {
    item.title = '发文系统';
    item.url = '/dispatch/tododetail';
    item.handleUrl = '/documents/handle_document';
    item.document_type = 1;
    this.nav('/send-document/receive-detail/'+item.id, item);
  }

  // public getIds(arr): string {
  //   return  arr.map(item => item.id).join(',');
  // }

  /**
   * 提交
   */
  async submit() {

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userId = userInfo.id;


    let user = this.getIds(this.selectedStaff);
    console.log(user)
    if(this.SignIndex!=4){
      let comment = this.infoTitle;
      if(!comment){
        await this.dialogService.toast("请输入意见");
        return false;
      }
      await this.document_jiaqian(false,comment);
    }
    if(!this.infoTitle){
      // if(this.getUserId()!=519){
      // }
      await this.dialogService.toast("请输入意见");
      return false;
    }
    await this.setRequest('/dispatch/todosave', {
      id: this.id,
      comments: this.infoTitle||"",
      ldid: this.ldid,
      index:this.SignIndex,
      user
    });
    this.events.publish(AppConfig.Document.DocumentList);
    this.events.publish(AppConfig.Home.Badge);
    this.events.publish(AppConfig.Synthesize.List);
    await this.dialogService.alert('提交成功!', () => {
        this.goBack();
    });
  }
  public viewProject(item) {
    this.nav('/project-detail?pid=' + item.id, item);
  }
  public getCommentShort(e) {
    this.infoTitle = e;
  }
}
