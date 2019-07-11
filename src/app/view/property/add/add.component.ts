import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import { DateProvider } from '../../../service/Date';
import { DatePipe } from '@angular/common';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss'],
})
export class AddComponent extends BasePage implements OnInit {
    public selectedStaff = [];
    public id: string;
    qjtypeList: [];

    public params = {
        zgbumen: '',
        zgtime: '',
        staff_ids: '',
        zgtype: '',
        zgmc: '',
        zgxh: '',
        zgsl: 0,
        ysje: 0,
        zgyy: '',
    };
    constructor(
        public http: HttpService,
        public router: Router,
        public dialogService: DialogService,
        public navController: NavController,
        public dateProvider: DateProvider,
        public route?: ActivatedRoute,
    ) {
        super(http, router,  navController, dialogService);
        this.title = this.query('title');
        const date = new Date();
        const datePipe = new DatePipe('en-US');
        this.params.zgtime = datePipe.transform(date, 'yyyy-MM-dd');


    }
    ngOnInit() {
        this.getQjtypeList();
    }

    getQjtypeList() {
        this.request('/zhigou/bumen_list', {}).then((res) => {
            this.qjtypeList = res.data;
        });
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
        console.log(params);
        if (!params.zgbumen) {
            this.dialogService.toast('请选择申请部门!');
            return false;
        } else if (!params.zgyy) {
            this.dialogService.toast('请输入资产购置原因!');
            return false;
        } else if (!params.staff_ids) {
            this.dialogService.toast('请选择第一处理人!');
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
        this.setRequest('/zhigou/zhigou_add', this.params).then((res) => {
            this.navController.back();
        });
    }
}
