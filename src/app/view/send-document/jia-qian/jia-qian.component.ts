import { Component, OnInit } from '@angular/core';
import {Events, ModalController, NavController, NavParams} from '@ionic/angular';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import {DomSanitizer} from '@angular/platform-browser';
import {FileService} from '../../../service/FileService';
import {AppConfig} from '../../../app.config';

@Component({
  selector: 'app-jia-qian',
  templateUrl: './jia-qian.component.html',
  styleUrls: ['./jia-qian.component.scss'],
})
export class JiaQianComponent extends BasePage implements OnInit {
  public signIndex = 0;
  public isJiaQian = false;
  // 签发人员
  public qianFaList = [];
  public shenGaoList = [];
  public heGaoList = [];
  public params = {
      id: '',
    signCreator1: '',
    signCreator2: '',
    signCreator3: '',
    comments: '',
  };

  constructor(
      public http: HttpService,
      public router: Router,
      public dialogService: DialogService,
      public sanitizer: DomSanitizer,
      public navController: NavController,
      public fileService: FileService,
      public modalCtrl: ModalController,
      public events: Events,
      public navParams: NavParams,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService);
    this.params.id = this.navParams.get('id');
    this.params.signCreator3 = this.navParams.get('hgUser');
    this.params.signCreator2 = this.navParams.get('sgUser');
    this.params.signCreator1 = this.navParams.get('qfUser');
    this.params.comments = this.navParams.get('comments');
    this.signIndex = this.navParams.get('signIndex');
    this.isJiaQian = this.navParams.get('isJiaQian');
    console.log(this.isJiaQian);
  }

  async ngOnInit() {
    await this.getHeGaoList();
    await this.getQianFaList();
    await this.getShenGaoList();
    // await this.request("/receipt/handersign",{})
    if (!this.isJiaQian) {
      this.signIndex = this.signIndex + 1;
    }
    console.log(this.signIndex);
  }

  public async getQianFaList() {
    const res =  await this.request('/dispatch/signCreator1', {});
    this.qianFaList = res.data;
  }
  public async getShenGaoList() {
    const res = await  this.request('/dispatch/signCreator2', {});
    this.shenGaoList = res.data;
  }
  public async getHeGaoList() {
    const res = await this.request('/dispatch/signCreator3', {});
    this.heGaoList = res.data;
  }
  public dismissModal() {
    this.modalCtrl.dismiss(
        {
          id: this.params.id
        }
    );
  }
  public async save() {
    if (this.isJiaQian) {
      await this.setRequest('/dispatch/signadd', this.params);
      await this.dialogService.alert('提交成功！', () => {
        this.dismissModal();
      });
    } else {
        if (!this.params.signCreator1 && !this.params.signCreator2 && !this.params.signCreator3) {
          await this.dialogService.toast('请选择人员');
          return false;
        }
        await this.setRequest('/dispatch/todosignsave', this.params);
        await this.dialogService.alert('提交成功！', () => {
        // this.dismissModal();
        this.modalCtrl.dismiss(
            {
              id: this.params.id,
              isBack: true
            }
        );
      });
    }

    this.events.publish(AppConfig.Document.DocumentList);
    this.events.publish(AppConfig.Home.Badge);
    this.events.publish(AppConfig.Synthesize.List);
  }

}
