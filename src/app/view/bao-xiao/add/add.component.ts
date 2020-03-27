import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import { DateProvider } from '../../../service/Date';
import { DatePipe } from '@angular/common';
import {Events, NavController} from '@ionic/angular';
import {AppConfig} from '../../../app.config';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss'],
})
export class AddComponent extends BasePage implements OnInit {
    public fileArray = [];
    public photo = '';
    public selectedStaff = [];
    // 提交的参数
    // 督办类别
    public id: string;
    qjtypeList: [];
    params = {
        name : '',
        depart: '',
        yongTu: '',
        // 用印日期
        riQi: '',
        // 报销金额大写
        baoXiaoJinEDaXie: '',
        // 报销金额小写
        baoXiaoJinEXiaoXie: '',
        jingBanRenYiJian: '',
        // 用印份数
        sl: 1,
        zhiFuFangShi: '',
        qingKuangShuoMing: '',
        qjetime: '',
        // 材料名称用印事由
        qjyy: '',
        // 申请类别
        qjtype: '印章使用审批',
        // 经办人意见
        zbyj: '',
        // 备注
        beizhu: '',
        // 处理人名单
        staff_ids: ''
    };
    constructor(
        public http: HttpService,
        public router: Router,
        public dialogService: DialogService,
        public navController: NavController,
        public dateProvider: DateProvider,
        public events: Events,
        public route?: ActivatedRoute,
    ) {
        super(http, router,  navController, dialogService);
        this.title = this.query('title');
        const date = new Date();
        const date2 = new Date().getTime() + 24 * 60 * 60 * 1000;
        const datePipe = new DatePipe('en-US');
        this.params.riQi = datePipe.transform(date, 'yyyy-MM-dd HH:mm');
        this.params.qjetime = datePipe.transform(date2, 'yyyy-MM-dd HH:mm');
    }
    ngOnInit() {
        const userInfo = JSON.parse(localStorage.userInfo);
        this.params.name = userInfo.name;
        this.params.depart = userInfo.depart;
        this.getQjtypeList();
    }

    getQjtypeList() {
        this.request('/baoXiao/qjtype', {}).then((res) => {
            this.qjtypeList = res.data;
        });
    }

    getFileArray(fileArray) {
        this.fileArray = fileArray;
    }

    ngModelChange(e) {
        console.log(e);
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

    // 检查参数
    private checkParams(params): boolean {
        if (!params.qjstime) {
            this.dialogService.toast('请选择用印日期!');
            return false;
        } else if (!params.qjyy) {
            this.dialogService.toast('请输入材料名称用印事由!');
            return false;
        } else if (!params.zbyj) {
            this.dialogService.toast('请输入经办人意见!');
            return false;
        } else if (!params.staff_ids) {
            this.dialogService.toast('请选择审批人!');
            return false;
        }
        return true;
    }
    getIds(arr): string {
        return  arr.map(item => item.id).join(',');
    }
    save() {
        this.params.staff_ids = this.getIds(this.selectedStaff);
        // if (!this.checkParams(this.params)) {
        //     return;
        // }
        this.params.riQi = this.dateProvider.DateTimeFormat(new Date(this.params.riQi));
        this.params.qjetime = this.dateProvider.DateTimeFormat(new Date(this.params.qjetime));
        this.dialogService.loading('正在提交，请稍后.....');
        this.uploadFiles('/baoXiao/zhsp_yinzhang_add', this.params, this.fileArray).then((res) => {
            this.dialogService.dismiss();
            this.dialogService.alert('提交成功！', () => {
                this.events.publish(AppConfig.Synthesize.List);
                this.events.publish(AppConfig.Synthesize.ShenPiList);
                this.navController.back();
            });
        });
    }
}
