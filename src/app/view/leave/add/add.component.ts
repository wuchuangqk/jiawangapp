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
    public photo = '';
    public selectedStaff = [];
    // 提交的参数
    // 督办类别
    public id: string;
    qjtypeList: [];
    public chuShiLingDaoList = [];
    public buShiLingDaoList = [];
    public fenGuanLingDaoList = [];
    public zhuYaoLingDaoList = [];
    params = {
        // 开始时间
        qjstime: '',
        // 结束时间
        qjetime: '',
        // 请假事由
        qjyy: '',
        // 请假类别
        qjtype: '事假',
        // 处理人名单
        staff_ids: '',
        signCreator1:'',
        signCreator2:'',
        signCreator3:'',
        signCreator4:'',
    };
    public fileArray = [];
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
        this.params.qjstime = datePipe.transform(date, 'yyyy-MM-dd HH:mm');
        this.params.qjetime = datePipe.transform(date2, 'yyyy-MM-dd HH:mm');


    }
    ngOnInit() {
        this.getQjtypeList();
        this.chuShiLingDao();
        this.buShiLingDao();
        this.fenGuanLingDao();
        this.zhuYaoLingDao();
    }

    getQjtypeList() {
        this.request('/qingjia/qjtype', {}).then((res) => {
            this.qjtypeList = res.data;
        });
    }
    private chuShiLingDao(){
        this.request('/qingjia/signCreator1', {}).then((res) => {
            this.chuShiLingDaoList = res.data;
        });
    }
    private buShiLingDao(){
        this.request('/qingjia/signCreator2', {}).then((res) => {
            this.buShiLingDaoList = res.data;
        });
    }

    private fenGuanLingDao(){
        this.request('/qingjia/signCreator3', {}).then((res) => {
            this.fenGuanLingDaoList = res.data;
        });
    }

    private zhuYaoLingDao(){
        this.request('/qingjia/signCreator4', {}).then((res) => {
            this.zhuYaoLingDaoList = res.data;
        });
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
    getFileArray(fileArray) {
        this.fileArray = fileArray;
    }

    // 检查参数
    private checkParams(params): boolean {
        if (!params.qjstime) {
            this.dialogService.toast('请选择请假开始时间!');
            return false;
        } else if (!params.qjetime) {
            this.dialogService.toast('请选择请假结束时间!');
            return false;
        } else if (!params.qjyy) {
            this.dialogService.toast('请输入请假事由!');
            return false;
        } else if (!params.qjtype) {
            this.dialogService.toast('请输入请假类型!');
            return false;
        }
        else if (!params.signCreator1) {
            this.dialogService.toast('请选择处室负责人!');
            return false;
        }

        else if (!params.signCreator1) {
            this.dialogService.toast('请选择部室负责人!');
            return false;
        }

        else if (!params.signCreator1) {
            this.dialogService.toast('请选择分管领导!');
            return false;
        }

        else if (!params.signCreator1) {
            this.dialogService.toast('请选择主要领导!');
            return false;
        }
        return true;
    }
    getIds(arr): string {
        return  arr.map(item => item.id).join(',');
    }
    save() {
        this.params.staff_ids = this.getIds(this.selectedStaff);
        if (!this.checkParams(this.params)) {
            return;
        }
        this.params.qjstime = this.dateProvider.DateTimeFormat(new Date(this.params.qjstime));
        this.params.qjetime = this.dateProvider.DateTimeFormat(new Date(this.params.qjetime));
        this.dialogService.loading('正在提交，请稍候....');
        this.uploadFiles('/qingjia/qingjia_add', this.params, this.fileArray).then((res) => {
            this.dialogService.dismiss();
            this.events.publish(AppConfig.Leave.ShenPiList);
            this.events.publish(AppConfig.Leave.List);
            this.navController.back();
        });
    }
}
