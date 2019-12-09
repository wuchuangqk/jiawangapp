import { Component, OnInit, ViewChildren } from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Events, NavController} from '@ionic/angular';
import {DialogService} from '../../../service/dialog.service';
// import { Keyboard } from '@ionic-native/keyboard';
import { ElementRef } from '@angular/core';
import {AppConfig} from '../../../app.config';
import autosize from './autosize';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent extends BasePage implements OnInit {
  public id: number;
  public infoTitle = '';
  public commitList = [];
  placeholder = '评论';
  public huiFuParams: any = {
    userId: '',
    workId: '',
    infoTitle: ''
  };
  public isHuiFu = false;
  constructor(
      public http: HttpService,
      public router: Router,
      public navController: NavController,
      public dialogService: DialogService,
      public elRef: ElementRef,
      public events: Events,
      private event: Events,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService);
    this.id = this.query('id');
    this.GetCommitList();
  }

  ngOnInit() {
    this.events.subscribe(AppConfig.Exchange.commentList, () => {
      this.GetCommitList();
    });
    const textareas = document.getElementsByTagName('textarea');
    autosize(textareas);
    for (let i = 0; i < textareas.length; i++) {
      textareas[i].style.minHeight = '60px';
    }
  }
  press(item) {
    console.log(item);
  }
  itemClick(item) {
    this.placeholder =  `回复 ${item.username}`;
    console.log(item);
    this.huiFuParams.userId = item.usreid;
    this.huiFuParams.workId = this.id;
    // this.displayTab(false);
    // this.showFooter = true;
    const el = document.getElementById('textarea');
    el.focus();
    this.isHuiFu = true;
  }
  addComment(isHuiFu, item) {
      this.nav('notice/comment-add/' + this.id, {id: this.id, isHuiFu, userId: item.usreid, workId: this.id});
  }
  GetCommitList() {
    this.request('/work_dynamics/commitlist', {item_id: this.id}).then((res) => {
      this.commitList = res.data;
    });
  }
doRefresh(event) {
  super.doRefresh(event);
  this.GetCommitList();
}

  submit() {
  if (this.isHuiFu) {
  this.huifu();
  } else {
    console.log(this.infoTitle);
    const params = {
      infoTitle: this.infoTitle,
      workId: this.id
    };
    this.setRequest('/work_dynamics/commitadd', params).then((res) => {
      this.dialogService.toast('回复成功！');
      this.infoTitle = '';
      this.GetCommitList();
    });
  }
  }

  huifu() {
    console.log(this.infoTitle);
    this.huiFuParams.infoTitle = this.infoTitle;
    this.setRequest('/work_dynamics/recommitadd', this.huiFuParams).then((res) => {
      this.dialogService.toast('回复成功！');
      this.isHuiFu = false;
      this.placeholder = '评论';
      this.infoTitle = '';
      this.event.publish(AppConfig.Exchange.view);
      this.GetCommitList();
    });
  }
}
