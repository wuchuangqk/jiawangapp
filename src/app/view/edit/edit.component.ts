import {Component, OnInit} from '@angular/core';
import {ImgUploadProvider} from '../../service/img-upload';
import {HttpService} from '../../service/http.service';
import {BasePage} from '../../base/base-page';
import {ActivatedRoute, Router} from '@angular/router';
import {Events, NavController} from '@ionic/angular';
import {DialogService} from '../../service/dialog.service';
import {AppConfig} from '../../app.config';
import {DetailBasePage} from '../../base/detail-base-page';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent extends DetailBasePage implements OnInit {
    public photo = '';
    public files = [];
    public fileArray = [];
    params = {
        title: '',
        content: '',
    };
    constructor(
        public http: HttpService,
        public router: Router,
        public navController: NavController,
        public dialogService: DialogService,
        public sanitizer: DomSanitizer,
        public events: Events,
        public route?: ActivatedRoute,
    ) {
        super(http, router, dialogService, sanitizer , navController);
        this.title = this.query('title');
        this.url = this.query('url');
        this.id = this.query('id');
        // this.contentTitle = this.query('contentTitle');
        this.title = this.query('title');
    }

    async ngOnInit() {
        this.getDetail({});
    }
    private checkParams(): boolean {
        if (!this.params.noticetitle) {
            this.dialogService.toast('请输入标题！');
            return false;
        } else if (!this.params.noticecontent) {
            this.dialogService.toast('请输入内容');
            return false;
        }
        return true;
    }
    getFileArray(fileArray) {
        this.fileArray = fileArray;
    }
    public submit() {
        if (!this.checkParams()) {
            return;
        }
        this.dialogService.loading('正在提交，请稍后！');
        this.uploadFiles('/notices/notices_add', this.params, this.fileArray).then((res) => {
            this.dialogService.dismiss();
            this.dialogService.alert('提交成功！', () => {
                //this.event.publish(AppConfig.Notice.List);
                this.navController.back();
            });
        });
    }
}
