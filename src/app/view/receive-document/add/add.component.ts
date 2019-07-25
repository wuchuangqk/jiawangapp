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
    public docLevelList = [];
    public storePeriodList = [];
    public receiptTypeList = [];
    public archiveTypeList = [];
    public selectedStaff = [];
    params = {
        // 收文标题
        docTitle : '',
        // 收文编号
        docCode: '',
        // 来文日期
        receiptDate: '',
        // 来文单位
        receiptUnit: '',
        // 等级
        docLevel: '',
        // 保管期限
        storePeriod: '',
        // 来文类型
        receiptType: '',
        // 归档分类
        archiveType: '',
        // 收文内容
        receiptContent : '',
        // 审核人名单：单选
        staff_ids : '',
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

    ngOnInit() {
        this.getDocLevel();
        this.getStorePeriod();
        this.getreceiptType();
        this.getarchiveType();
    }
    private checkParams(): boolean {
        if (!this.params.docTitle) {
            this.dialogService.toast('请输入标题！');
            return false;
        } else if (!this.params.receiptContent) {
            this.dialogService.toast('请输入内容');
            return false;
        } else if (!this.params.staff_ids) {
            this.dialogService.toast('请选择审核人！');
            return false;
        }
        return true;
    }
    // 等级
    getDocLevel() {
        this.request('/documents/getdoclevel', {}).then((res) => {
            this.docLevelList = res.data;
        });
    }
    // 保管期限
    getStorePeriod() {
        this.request('/documents/GetStorePeriod', {}).then((res) => {
            this.storePeriodList = res.data;
        });
    }
    // 来文类型
    getreceiptType() {
        this.request('/documents/GetreceiptType', {}).then((res) => {
            this.receiptTypeList = res.data;
        });
    }
    // 归档分类
    getarchiveType() {
        this.request('/documents/GetarchiveType', {}).then((res) => {
            this.archiveTypeList = res.data;
        });
    }

    public getIds(arr): string {
        return  arr.map(item => item.id).join(',');
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
        this.params.staff_ids = this.getIds(this.selectedStaff);
        if (!this.checkParams()) {
            return;
        }
        this.dialogService.loading('正在提交，请稍后！');
        this.uploadFiles('/documents/receipt_add', this.params, this.fileArray).then((res) => {
            this.dialogService.dismiss();
            this.dialogService.alert('提交成功！', () => {
                this.event.publish(AppConfig.Notice.List);
                this.navController.back();
            });
        });
    }
}
