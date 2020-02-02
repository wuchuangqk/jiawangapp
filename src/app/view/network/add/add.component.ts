import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import { DateProvider } from '../../../service/Date';
import {Events, NavController} from '@ionic/angular';
import {AppConfig} from '../../../app.config';
import {IndexedDBService} from '../../../service/IndexedDBService';

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
    params = {
        name: '',
        ip: ''
    };
    constructor(
        public http: HttpService,
        public router: Router,
        public dialogService: DialogService,
        public navController: NavController,
        public events: Events,
        public indexedDBService: IndexedDBService,
        public route?: ActivatedRoute,
    ) {
        super(http, router,  navController, dialogService);
        this.title = this.query('title');


    }
    ngOnInit() {
    }



    // 检查参数
    private checkParams(params): boolean {
        if (!params.name) {
            this.dialogService.toast('请输入网络名称!');
            return false;
        } else if (!params.ip) {
            this.dialogService.toast('请输入网络地址!');
            return false;
        }
        return true;
    }
    save() {
        if (!this.checkParams(this.params)) {
            return;
        }

        this.indexedDBService.add(this.params).then((res) => {
            this.events.publish(AppConfig.NetWork.list);
            this.navController.back();
        });
       // this.setRequest('/waichu/waichu_add', this.params).then((res) => {
       // });
    }
}
