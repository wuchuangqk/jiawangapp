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
export class AddComponent extends BasePage implements OnInit {
    public imgArr = [];
    public photo = '';
    public fileUrl: any = '';
    public avatar: any;
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
    fileChange(file) {

        let preview = document.querySelector('.preview');
        let previewBtn = preview.children[0];

        const filelist = file.target.files;
        console.log(filelist);
        [].slice.call(filelist).forEach((value, index) => {  // 遍历file对象
            const fileReader = new FileReader(); // 创建一个filereader对象
            const img: any = new Image();  // 创建一个图片对象
            fileReader.readAsDataURL(value);  // 读取所上传对的文件
            fileReader.onload = function() {
                img.src = this.result;   // 读取完成后，赋值给img对象
                preview.appendChild(img);  // 添加到预览区域
            };
        });


    }
    public submit() {
        if (!this.checkParams()) {
            return;
        }
        this.dialogService.loading('正在提交，请稍后！');
        this.uploadFile('/notices/notices_add', this.params, this.fileUrl).then((res) => {
            this.dialogService.dismiss();
            this.dialogService.alert('提交成功！', () => {
                this.event.publish(AppConfig.Notice.List);
                this.navController.back();
            });
        });
    }
    presentActionSheet() {
        this.imgUploadProvider.presentAction().then((url) => {
            this.fileUrl = url;
        });
    }
}
