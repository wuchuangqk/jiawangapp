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
    public departid = 0;
    qjtypeList: [];
    params = {
        // 申请部室
        bumen: 0,
        xuhao_one: '',
        quyu: '',
        xuhao_two: '',
        wupinMC: '',
        shuliang: '',
        yanse: '',
        guige: '',
        jiage: '',
        shijian: '',
        beizhu: '',
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
        // this.params.qjstime = datePipe.transform(date, 'yyyy-MM-dd HH:mm');
        this.params.shijian = datePipe.transform(date2, 'yyyy-MM-dd HH:mm');


    }
    ngOnInit() {
        this.getQjtypeList();
        this.departid = Number(JSON.parse(localStorage.userInfo).departid);
        this.params.bumen = this.departid;

    }

    // @ts-ignore
    private async getQjtypeList(): Promise<any> {
        const res = await this.request('/zhigou/bumen_list', {});
        this.qjtypeList = res.data;
    }


    ngModelChange(e) {
        console.log(e);
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
        this.params.shijian = this.dateProvider.DateTimeFormat(new Date(this.params.shijian));
        this.dialogService.loading('正在提交，请稍候....');
        this.setRequest('/zhigou/zhichan_add', this.params).then((res) => {
            this.dialogService.dismiss();
            this.events.publish(AppConfig.FinanceDetail.list);
            this.navController.back();
        });
    }
}
