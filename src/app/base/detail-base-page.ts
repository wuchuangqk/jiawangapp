import { OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpService } from '../service/http.service';
import { DialogService } from '../service/dialog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BasePage} from './base-page';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
interface IDetail {
    content: string;
    control?: string;
    finish?: string;
}
export class DetailBasePage extends BasePage {
    public payload = {};
    public url: string;
    public id: string;
    public comment: boolean;
    public SignIndex: number;
    // 是否已办理
    public isgned = false;
    public zhengWen: IDownFile = {
        filename: '',
        fileext: '',
        fileurl: ''
    };
    public detail: IDetail = {
        content: '',
        control: '',
        finish: '',
    };
    public content: SafeHtml = '';
    public comment_num: any;
    public isBackToHome:boolean = false;
    public fileList: Array<IDownFile> = [];
    constructor(
        public http: HttpService,
        public router: Router,
        public dialogService: DialogService,
        public sanitizer: DomSanitizer,
        public navController: NavController,
        public route?: ActivatedRoute,
    ) {
        super(http, router, navController, dialogService);
    }
    public async getDetail(data) {
        const res = (await this.request(this.url + '/' + this.id, data));
        if (res.data) {
            this.detail = res.data;
            this.SignIndex = res.data.SignIndex;
            this.isgned = res.data.isgned;
            this.comment = res.data.comment === '1';
            this.zhengWen = res.data.pdfurl;
            this.comment_num = res.data.comment_num;
            if (res.data.file) {
                this.fileList = res.data.file;
            }
        }
        if (res.data.json) {
            this.detail.control = '1';
        }
        this.content = this.transform(res.data.content || res.data.json) || '';
        console.log(this.content);
    }
    doRefresh(event) {
        super.doRefresh(event);
        this.getDetail(this.payload);
    }
    getIsBackToHome(){
        let isBackToHome = this.query('isBackToHome')
        if(isBackToHome==='true'){
            this.isBackToHome = true
        }else{
            this.isBackToHome = false;
        }
        console.log("是否回到首页!");
        console.log(this.isBackToHome);
    }
    viewFile(item: IDownFile) {
        this.nav('pdf', item);
    }
    public transform(content): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(content);
    }
    // 返回
    public goBack():void{
        if(this.isBackToHome){
            this.navController.navigateBack('tabs/home-tab');
        }else{
            this.navController.back();
        }
    }
}
