import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import { DateProvider } from '../../../service/Date';
import { DatePipe } from '@angular/common';
import {Events, NavController} from '@ionic/angular';
import {App} from '@ionic/pro';
import {AppConfig} from '../../../app.config';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss'],
})
export class AddComponent extends BasePage implements OnInit {
    public selectedStaff = [];
    // 提交的参数
    // 督办类别
    public id: string;
    qjtypeList: [];
    params = {
        // 开始时间
        qjstime: '',
        // 结束时间
        qjetime: '',
        // 加班事由
        qjyy: '',
        // 加班类别
        qjtype: '事假',
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
        this.params.qjstime = datePipe.transform(date, 'yyyy-MM-dd HH:mm');
        this.params.qjetime = datePipe.transform(date2, 'yyyy-MM-dd HH:mm');


    }
    ngOnInit() {
    }


    ngModelChange(e) {
        console.log(e);
    }

    go( eventName, selectedStaff, isSelectOne) {
        localStorage.num = 0;
        this.nav('/receive-document/staff-select/0000', {
            title: 'aaa', url: 'bbb', depart_id: '0000',
            isSelectOne,
            eventName,
            selected_staff : JSON.stringify(selectedStaff),
            selectedStaff : JSON.stringify(selectedStaff)
        });
    }

    // 检查参数
    private checkParams(params): boolean {
        if (!params.qjstime) {
            this.dialogService.toast('请选择加班开始时间!');
            return false;
        } else if (!params.qjetime) {
            this.dialogService.toast('请选择加班结束时间!');
            return false;
        } else if (!params.qjyy) {
            this.dialogService.toast('请输入加班事由!');
            return false;
        } else if (!params.qjtype) {
            this.dialogService.toast('请输入加班类型!');
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
        if (!this.checkParams(this.params)) {
            return;
        }
        this.params.qjstime = this.dateProvider.DateTimeFormat(new Date(this.params.qjstime));
        this.params.qjetime = this.dateProvider.DateTimeFormat(new Date(this.params.qjetime));
        this.setRequest('/jiaban/jiaban_add', this.params).then((res) => {
            this.dialogService.toast('申请成功！');
            this.events.publish(AppConfig.OvertimeWork.ShenPiList);
            this.events.publish(AppConfig.OvertimeWork.List);
            this.navController.back();
        });
    }
}
