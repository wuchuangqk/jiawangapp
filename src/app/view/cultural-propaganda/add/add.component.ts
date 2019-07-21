import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../service/http.service';
import {BasePage} from '../../../base/base-page';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {DialogService} from '../../../service/dialog.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent extends BasePage implements OnInit {
    public photo = '';
    public fileUrl: any = '';
    params = {
        infoTitle: '',
        infoType: '1',
        infoContent: ''
    };
    constructor(
        public http: HttpService,
        public router: Router,
        public navController: NavController,
        public dialogService: DialogService,
        public route?: ActivatedRoute,
    ) {
        super(http, router, navController, dialogService);
    }

    ngOnInit() {}
    public checkParams(): boolean {
        if (!this.params.infoTitle) {
            this.dialogService.toast('请输入标题！');
            return false;
        } else if (!this.params.infoContent) {
            this.dialogService.toast('请输入内容！');
            return false;
        }
        return true;
    }
    public submit() {
        if (!this.checkParams()) {
            return ;
        }
        this.dialogService.loading('正在提交，请稍后....');
        this.setRequest('/notices/wenxuan_add', this.params).then((res) => {
            this.dialogService.dismiss();
            this.dialogService.alert('提交成功！', () => {
                this.navController.back();
             });
        });
    }
}
