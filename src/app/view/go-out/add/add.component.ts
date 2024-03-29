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
    public selectedStaff = [];
    // 提交的参数
    // 督办类别
    public id: string;
    qjtypeList: [];
    public fenGuanLingDaoList=[];
    public zhuYaoLingDaoList=[];
    params = {
        // 开始时间
        qjstime: '',
        // 结束时间
        qjetime: '',
        // 外出事由
        qjyy: '',
        // 外出类别
        qjtype: '',
        // 申请人
        staff_ids: '',
        addr: '',
        zfdw: '',
        signCreator1:'',
        signCreator2:'', // 主要领导
        saddr1:"",
        eaddr1:'',
        saddr2:"",
        eaddr2:''

    };

    public shengQingRenName = '';

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
        const userInfo =  JSON.parse(localStorage.getItem('userInfo'));
        // this.shengQingRenName = userInfo.name;
        // this.selectedStaff = [userInfo.id];
        this.selectedStaff = [{
            id:userInfo.id,
            isSelected: true,
            name: userInfo.name,
            position: userInfo.position
        }];
        this.getFenGuanLingDaoList();
        this.getZhuYaoLingDaoList();
    }


    ngModelChange(e) {
        console.log(e);
    }

    private getFenGuanLingDaoList(){
        this.request("/waichu/signCreator1",{}).then((res)=>{
            this.fenGuanLingDaoList = res.data;
        })
    }

    private getZhuYaoLingDaoList(){
        this.request("/waichu/signCreator2",{}).then((res)=>{
            this.zhuYaoLingDaoList = res.data;
        })
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
            this.dialogService.toast('请选择外出开始时间!');
            return false;
        } else if (!params.qjetime) {
            this.dialogService.toast('请选择外出结束时间!');
            return false;
        } else if (!params.qjyy) {
            this.dialogService.toast('请输入外出事由!');
            return false;
        }else if (!params.signCreator1) {
            this.dialogService.toast('请选择分管领导!');
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
        this.setRequest('/waichu/waichu_add', this.params).then((res) => {
            this.events.publish(AppConfig.GoOut.List);
            this.events.publish(AppConfig.GoOut.ShenPiList);
            this.navController.back();
        });
    }
}
