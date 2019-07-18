import {Component, OnDestroy, OnInit} from '@angular/core';
import {ImgUploadProvider} from '../../../service/img-upload';
import {HttpService} from '../../../service/http.service';
import { Base64 } from '@ionic-native/base64/ngx';
import {BasePage} from '../../../base/base-page';
import {ActivatedRoute, Router} from '@angular/router';
import {Events, NavController} from '@ionic/angular';
import {DialogService} from '../../../service/dialog.service';
import {AppConfig} from '../../../app.config';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent extends BasePage implements OnInit{
    public imgArr = [];
    public photo = '';
    public avatar: any;
    public fileUrl: any = '';
    params = {
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
        this.title = this.query('title');
    }

    ngOnInit() {}
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
    public submit() {
        if (!this.checkParams()) {
            return;
        }
        this.imgUploadProvider.startUpload('/notices/notices_add', this.params, this.fileUrl).then((res) => {
            this.dialogService.alert('上传成功后回调：' + JSON.stringify(res), () => {
                this.event.publish(AppConfig.Notice.List);
                this.navController.back();
            });
        });
    }
    presentActionSheet() {
        this.imgUploadProvider.presentAction().then((url) => {
            this.dialogService.alert('地址：' + JSON.stringify(url));
            this.fileUrl = url;
        });
    }
}
