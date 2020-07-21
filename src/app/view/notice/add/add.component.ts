import {Component, OnInit} from '@angular/core';
import {ImgUploadProvider} from '../../../service/img-upload';
import {HttpService} from '../../../service/http.service';
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
    public photo = '';
    public files = [];
    public fileArray = [];
    params = {
        noticetitle: '',
        noticecontent: '',
        roleType: 1,
        infoType: '通知'
    };

    public InfoTypeList = [
        {value: '通知', label: '通知' },
        {value: '公告', label: '公告' }
    ];
    public selectedStaff = [];
    public keshiIds = [];
    public keShiList = [];
    public rolesList = [
        {value: 1, label: '全部' },
        {value: 2, label: '科室' },
        {value: 3, label: '个人' },
        {value: 4, label: '私人' }
    ];
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

    ngOnInit() {
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
    public submit() {
        if (!this.checkParams()) {
            return;
        }
        this.dialogService.loading('正在提交，请稍后！');
        this.uploadFiles('/notices/notices_add', this.params, this.fileArray).then((res) => {
            this.dialogService.dismiss();
            this.dialogService.alert('提交成功！', () => {
                this.event.publish(AppConfig.Notice.List);
                this.navController.back();
            });
        });
    }
}
