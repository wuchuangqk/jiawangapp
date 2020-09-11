import {Component, OnDestroy, OnInit} from '@angular/core';
import {DetailBasePage} from '../../../base/detail-base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import { DomSanitizer } from '@angular/platform-browser';
import {Events} from '@ionic/angular';
import {AppConfig} from '../../../app.config';
import { NavController } from '@ionic/angular';
import {FileService} from "../../../service/FileService";


@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
// @ts-ignore
export class DetailComponent  extends DetailBasePage implements OnInit, OnDestroy {
    public title = '详情';
    public isShenPi: boolean;
    // tslint:disable-next-line:variable-name
    public handle_status: string;
    public handleUrl: string;
    public infoTitle: string;
    public isEdit = false;
    public tabIndex = 0;
    public signList = [];
    public payload: {
        document_type: string,
        opinion:string,
        id:string,
    };
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
        super( http, router, dialogService, sanitizer, navController,fileService);
        this.url = this.query('url');
        this.title = this.query('title');
        this.handleUrl = this.query('handleUrl');
        this.handle_status = this.query('handle_status');
        this.id = this.query('id');
        this.isShenPi = this.getQueryParams().isShenPi;
        this.payload.document_type = this.query('document_type');
        this.payload.id  = this.id;
        this.getIsBackToHome();
    }

    ngOnInit() {
        this.getDetail(this.payload);
        this.getSignList();
        this.events.subscribe(AppConfig.Document.DocumentDetail, () => {
            this.getDetail(this.payload);
            this.isShenPi = false;
            this.handle_status = '0';
        });
    }
    ngOnDestroy(): void {
        this.events.unsubscribe(AppConfig.Document.DocumentDetail);
    }
    /*
    * 获取流程
    */
    private async getSignList() {
        const res = await this.request('/letter/signlist', {item_id: this.id});
        this.signList = res.data;
    }
    async save() {
        if (!this.payload.opinion) {
            this.dialogService.toast('请输入意见！');
            return ;
        }
        await this.dialogService.toast('正在提交数据...');
        await this.setRequest("/letter/handle_letter", this.payload);
        this.events.publish(AppConfig.Home.Badge);
        this.events.publish(AppConfig.Assign.List);
        this.events.publish(AppConfig.Assign.DoneList);
        this.events.publish(AppConfig.Document.DocumentDetail);
        this.events.publish(AppConfig.Document.DocumentList);
        this.dialogService.alert('提交成功',()=>{
            this.goBack();
        });
    }
}
