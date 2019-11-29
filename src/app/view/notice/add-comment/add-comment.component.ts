import { Component, OnInit } from '@angular/core';
import {AppConfig} from '../../../app.config';
import {DialogService} from '../../../service/dialog.service';
import {ImgUploadProvider} from '../../../service/img-upload';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Events, NavController} from '@ionic/angular';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent extends BasePage implements OnInit {

  public fileArray = [];
public id: number;
  public params = {
    noticetitle: '',
    noticecontent: '',
  };
  constructor(
      public http: HttpService,
      public router: Router,
      public navController: NavController,
      public dialogService: DialogService,
      private imgUploadProvider: ImgUploadProvider,
      private event: Events,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService);
    this.id = this.query('id');
  }

  ngOnInit() {}
  getFileArray(fileArray) {
    this.fileArray = fileArray;
  }

  private checkParams(): boolean {
      if (!this.params.noticecontent) {
      this.dialogService.toast('请输入内容');
      return false;
    }
      return true;
  }
  public submit() {
    if (!this.checkParams()) {
      return;
    }

    const params = {
      infoTitle: this.params.noticecontent,
      workId: this.id
    };
    // this.setRequest('/work_dynamics/commitadd', params).then((res) => {
    //   this.dialogService.toast('回复成功！');
    //   // this.infoTitle = '';
    //   // this.GetCommitList();
    // });
    // this.dialogService.loading('正在提交，请稍后！');
    this.uploadFiles('/work_dynamics/commitadd', params, this.fileArray).then((res) => {
      this.dialogService.dismiss();
      this.dialogService.alert('提交成功！', () => {
        this.event.publish(AppConfig.Notice.List);
        this.navController.back();
      });
    });
  }
}
