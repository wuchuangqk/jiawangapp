import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import { NavController } from '@ionic/angular';
import { Events } from '@ionic/angular';
import {DetailBasePage} from '../../../base/detail-base-page';
import {HttpService} from '../../../service/http.service';
import {DialogService} from '../../../service/dialog.service';
import {AppConfig} from '../../../app.config';
import {path} from '@angular-devkit/core';
import {FileService} from "../../../service/FileService";

@Component({
    selector: 'app-common-view',
    templateUrl: './common-view.component.html',
    styleUrls: ['./common-view.component.scss'],
})
export class ExchangeViewComponent extends DetailBasePage implements OnInit, OnDestroy {
    public contentTitle = '';
    public content = '';
    public infoTitle = '';
    public flag = false;
    public commitList = [];
    public readNumber = 0; // 已读人数
    public noReadNumber = 0; // 未读人数
    public getReadUrl = '/work_dynamics/GetRead/';
    constructor(
        public http: HttpService,
        public router: Router,
        public navController: NavController,
        public dialogService: DialogService,
        public sanitizer: DomSanitizer,
        public events: Events,
        public fileService: FileService,
        public route?: ActivatedRoute,
    ) {
        super(http, router, dialogService, sanitizer , navController,fileService);
        this.title = this.query('title');
        this.url = this.query('url');
        this.id = this.query('id');
        this.contentTitle = this.query('contentTitle');
    }

    ngOnInit() {
        this.events.subscribe(AppConfig.Exchange.view, () => {
            this.GetCommitList();
            this.getDetail({}).then(() => {
                this.events.publish(AppConfig.Notice.List);
                this.events.publish(AppConfig.Home.Badge);
            });
        });
        this.GetCommitList();
        this.getReadNumber();
        this.getDetail({}).then((res) => {
            this.events.publish(AppConfig.Notice.List);
            this.events.publish(AppConfig.Home.Badge);
        });
    }
    ngOnDestroy() {
    }
    edit(e) {
        console.log(this.title);
        console.log(this.url);
        console.log(this.id);
        this.nav('edit', {
            title: this.title,
            url: this.url,
            id: this.id
        });
    }
    GetCommitList() {
        this.request('/work_dynamics/commitlist', {item_id: this.id}).then((res) => {
            this.commitList = res.data;
        });
    }
    getReadNumber() {
        this.request(this.getReadUrl + this.id, {}).then((res) => {
            this.readNumber = res.data.hasreader.length;
            this.noReadNumber = res.data.noreader.length;
        });
    }
    submit() {
        console.log(this.infoTitle);
        const params = {
            infoTitle: this.infoTitle,
            workId: this.id
        };
        this.setRequest('/work_dynamics/commitadd', params).then((res) => {
            this.dialogService.toast('回复成功！');
            this.infoTitle = '';
            this.GetCommitList();
        });
    }
}
