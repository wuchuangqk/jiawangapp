import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import { DateProvider } from '../../../service/Date';
import {Events, NavController} from '@ionic/angular';
import {AppConfig} from '../../../app.config';
import {ImgUploadProvider} from '../../../service/img-upload';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss'],
})
export class AddComponent extends BasePage implements OnInit {
    public fillDate: '';
    public latestDate: '';
    public selectedStaff = [];
    public _selectedStaff = [];
    public imgArr = [];
    public fileArray = [];
    public photo = '';
    public fileUrl: any = '';
    // 提交的参数
    public params: any = {
        url: '/letter/letteradd',
        lettertitle: '',
        lettertype: '督办',
        lettersource: '领导交办',
        fillDate: '',
        latestDate: '',
        contactemail: '',
        staff_ids: '',
        zrl: '', // 责任人
        phr: '', // 配合人
        lettercontent: ''// 内容
    };
    // 督办类别
    public duBanCatogray = [];
    // 办理事项
    public banLiShiXiang = [];
    public showContactTitle = '责任人';
    public title = '新增交办';
    public documentType: string;
    public type: string;
    public opinions = [];
    public id: string;
    constructor(
        public http: HttpService,
        public router: Router,
        public dialogService: DialogService,
        public navController: NavController,
        public dateProvider: DateProvider,
        public events: Events,
        public imgUploadProvider: ImgUploadProvider,
        public route?: ActivatedRoute,
    ) {
        super(http, router,  navController, dialogService);
        this.title = this.query('title');

    }
    ngOnInit() {
        this.getBanLiShiXiang();
        this.getduBanCatogray();
    }
    getFileArray(fileArray) {
        this.fileArray = fileArray;
    }
    ngModelChange(e) {
        console.log(e);
    }
    getduBanCatogray() {
        this.request('/letter/lettertype', {}).then((res) => {
            this.duBanCatogray = res.data;
        });
    }
    getBanLiShiXiang() {
        this.request('/letter/lettersource', {}).then((res) => {
            this.banLiShiXiang = res.data;
        });
    }
    getData() {
        const params = {
            url: '/others/default_opinions',
            type: this.type
        };
        this.request(params.url, params).then((data) => {
            this.opinions = data.data;
        }).catch(error => {
            this.opinions = [{opinion: '请各位领导继续审阅'}, {opinion: '已处理'}, {opinion: '已阅'}];
        });
    }

    go( eventName, selectedStaff, isSelectOne) {
        localStorage.num = 0;
        this.nav('/receive-document/staff-select/0000', {
            title: '选择人员', url: 'bbb', depart_id: '0000',
            isSelectOne,
            eventName,
            selected_staff : JSON.stringify(selectedStaff),
            selectedStaff : JSON.stringify(selectedStaff)
        });
    }


    /**
     * 保存
     * @param opinions
     */
    public checkParams(params): boolean {
        if (!params.lettertitle) {
            this.dialogService.toast('请输入标题!');
            return false;
        } else if (!params.zrl) {
            this.dialogService.toast('请选择责任人!');
            return false;
        } else if (!params.phr) {
            this.dialogService.toast('请选择配合人!');
            return false;
        } else if (!params.lettercontent) {
            this.dialogService.toast('请输入内容!');
            return false;
        }
        return true;
    }
    getIds(arr): string {
        return  arr.map(item => item.id).join(',');
    }
    save() {
        this.params.zrl = this.getIds(this.selectedStaff);
        this.params.phr = this.getIds(this._selectedStaff);
        if (!this.checkParams(this.params)) {
            return;
        }
        if (this.fillDate) {
            this.params.fillDate = this.dateProvider.DateTimeFormat(new Date(this.fillDate));
        }
        if (this.latestDate) {
            this.params.latestDate = this.dateProvider.DateTimeFormat(new Date(this.latestDate));
        }


        this.dialogService.loading('正在提交，请稍后！');
        this.uploadFiles(this.params.url, this.params, this.fileArray).then((res) => {
            this.dialogService.dismiss();
            this.dialogService.alert('提交成功！', () => {
                this.events.publish(AppConfig.Notice.List);
                this.events.publish(AppConfig.Assign.List);
                this.navController.back();
            });
        });
    }
}
