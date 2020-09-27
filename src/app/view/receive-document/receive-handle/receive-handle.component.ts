import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, Events, ModalController, NavController} from '@ionic/angular';
import {DialogService} from '../../../service/dialog.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {AppConfig} from '../../../app.config';
import {DetailBasePage} from '../../../base/detail-base-page';
import {FileService} from "../../../service/FileService";
import { ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { v4 as uuidv4 } from 'uuid';
import {JiaQianComponent} from "../jia-qian/jia-qian.component";

import  AlloyFinger  from 'alloyfinger';


@Component({
  selector: 'app-receive-handle',
  templateUrl: './receive-handle.component.html',
  styleUrls: ['./receive-handle.component.scss'],
})
export class ReceiveHandleComponent  extends DetailBasePage implements OnInit, OnDestroy  {

  public isCommentOpen=false;
  public currentModal = null;
  // 定时器
  public timer = null;
  public userId = 0;
  public title = '详情';
  public isShenPi: boolean;
  public handle_status: string;
  public handleUrl: string;
  public infoTitle: string;
  public isEdit = false;
  public tabIndex = -1;
  public commentList = [];
  public isMore = false;
  public commentShort = '';
  public primarySignerList = [];
  public fenGuanLingDaoList = [];
  public staff_ids = [];
  public ldid = '';
  //操作日志列表
  public signLogList=[];
  public primarySignName = '';
  public fenGuanLingDaoNames = '';
  public signList:SafeHtml = "";
  public selectedStaff = [];
  // 关联项目
  public linkProjectList = [];
  // 关联收文
  public linkReceiptList = [];
  // 关联发文
  public linkDispathList = [];
  public BaseImgList = [];
  public fontFileList = [];
  public payload: {
    document_type: string
  };
  public cansFile = "";
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  public signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 15,
    'canvasWidth': 200,
    'canvasHeight': 200
  };

  constructor(
    public http: HttpService,
    public router: Router,
    public navController: NavController,
    public dialogService: DialogService,
    public sanitizer: DomSanitizer,
    public events: Events,
    public modalController: ModalController,
    public alertController: AlertController,
    public fileService: FileService,
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
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.userId = userInfo.id;
    await this.getDetail(this.payload);
    await this.getCommentList();
    await this.getFenGuanLingDaoList();
    await this.getSignList();
    await this.getLinkProjectList();
    await this.getSingLog();
    await this.scale();
    this.signaturePad.set('minWidth', 5);
    this.events.subscribe(AppConfig.Document.DocumentDetail, () => {
      this.getDetail(this.payload);
      this.isShenPi = false;
      this.handle_status = '0';
    });
  }


  async getSingLog(){
    let res = await this.request("/receipt/signlog",{docid:this.id})
    this.signLogList = res.data;
  }



  private async  scale() {
    let _this=this;
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
        // console.log(evt.deltaX);
        // console.log(evt.deltaY);
      },
      swipe(evt) {
        console.log('swipe' + evt.direction);
        console.log(this);
        _this.isCommentOpen=false
      }
    });
  }



  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  /********************
  * 退回
  ********************/
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
            this.setRequest('/receipt/signback', {
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


  /********************
   * 办结
   ********************/
  public async document_banJie(){
    let alert = await this.alertController.create({
      mode:'md',
      header: '办结!',
      message:"该操作不能撤销，确定要办结吗？",
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
          handler: () => {
            this.setRequest('/receipt/overaction', {
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


  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event

    let base64Img = this.signaturePad.toDataURL();
    console.log();
    console.log(this.timer);
    if(!this.timer){
      this.timer = setTimeout(()=>{
        console.log("生成一张图片")
        this.BaseImgList.push(base64Img)

        let blob = this.dataURLtoFile(base64Img);
        let uuid = uuidv4();
        this.cansFile= this.blobToFile(blob,uuid+".png");
        this.fontFileList.push({
          file:this.cansFile,
          name: uuid+".png"
        })
        this.timer = null;
        this.signaturePad.clear();
      },800)
    }
  }


  /********************
  * 加签
  ********************/
  public async document_jiaqian(isJiaQian){
      this.nav("receive-document/jia-qian",{
        id:this.id
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
   * 减签
   ********************/
  public async document_jianqian(isJiaQian){
    this.nav("receive-document/jian-qian",{
      id:this.id
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
  *传阅
  ********************/
  public async document_chaunYue(){
    this.nav("send-document/chuan-yue",{id:this.id,
      url:'/receipt/signread'
    })
  }
  dismissModal() {
    if (this.currentModal) {
      this.currentModal.dismiss().then(() => { this.currentModal = null; });
    }
  }

  /********************
  *终止
  ********************/
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
            this.setRequest('/receipt/signstop', {
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


  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
    clearTimeout(this.timer);
    this.timer = null;
  }

  //将base64转换为文件
  dataURLtoFile(dataurl) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
    // return new File([u8arr], uuid+".png", { type: mime });
  }
  viewFile(item: IDownFile) {
    this.nav('pdf', item);
  }
  // 清除
  clearDraw(){
    this.signaturePad.clear();
  }
  private async  getCommentList() {
    const res = await this.request('/receipt/commentStore', {});
    this.commentList = res.data;
  }


  private async  getFenGuanLingDaoList() {
    // const  res = await  this.request('/receipt/signselect', {
    //   depart_id: 17
    // });
    // this.fenGuanLingDaoList = res.data.staffs;
  }

  private async getSignList() {
    const res = await this.request('/receipt/signlist', {item_id: this.id});
    this.signList = this.transform(res.data.json);
    console.log(this.signList);
  }


  ngOnDestroy(): void {
    this.events.unsubscribe(AppConfig.Document.DocumentDetail);
  }
  public deleteAImg(){
    this.BaseImgList.pop()
    this.fontFileList.pop()
  }

  private async getLinkProjectList() {
    const res = await this.request('/receipt/oarel/' + this.id, {});
    this.linkProjectList = res.data.result;
    this.linkReceiptList = res.data.receipt;
    this.linkDispathList = res.data.dispath;
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
      header: '请选择办理人',
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

  /*
   * 关联发文查看
   */
  public viewFaWen(item) {
    item.title = '发文系统';
    item.url = '/dispatch/tododetail';
    item.handleUrl = '/documents/handle_document';
    item.document_type = 1;
    this.nav('send-document/receive-handle/'+item.id, item);
  }

  public getIds(arr): string {
    return  arr.map(item => item.id).join(',');
  }

  /**
   * 提交
   */
  async submit() {

    // const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    // const userId = userInfo.id;

    let staff_ids = this.staff_ids.join(',');
    // 如果办理步骤大于于2 staff_ids 是承办人
    if (this.doselect) {
      staff_ids = this.getIds(this.selectedStaff);
      console.log(staff_ids);
      if(!staff_ids){
        await this.dialogService.toast("请选择办理人！");
        return false;
      }
    }
    // 如果办理步骤小于2 则要选择分管领导
    if (!this.infoTitle) {
      if (this.getUserId() != 519) {
        this.dialogService.toast('请输入意见！');
        return false;
      }
    }

    let url = this.doselect?"/receipt/signselect":"/receipt/todosaveNew";
    if(this.docState==1){
      url="/receipt/anditsaveNew"
    }
    await this.uploadFiles(url,{
      SignId:this.SignId,
      id: this.id,
      comments: this.infoTitle||"",
      ldid: this.ldid,
      staff_ids
    },this.fontFileList);
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

  blobToFile(newBlob, fileName) {
    newBlob.lastModifiedDate = new Date();
    newBlob.name = fileName;
    return newBlob;
  };


  public getCommentShort(e) {
    this.infoTitle = e;
  }
}
