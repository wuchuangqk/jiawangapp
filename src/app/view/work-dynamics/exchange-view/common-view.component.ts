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
        public route?: ActivatedRoute,
    ) {
        super(http, router, dialogService, sanitizer , navController);
        this.title = this.query('title');
        this.url = this.query('url');
        this.id = this.query('id');
        this.contentTitle = this.query('contentTitle');
    }

    ngOnInit() {
        this.events.subscribe(AppConfig.Exchange.view, () => {
            this.GetCommitList();
            this.getDetail({}).then(() => {
                this.events.publish(AppConfig.Exchange.List);
                this.events.publish(AppConfig.Home.Badge);
            });
        });
        this.GetCommitList();
        this.getReadNumber();
        this.events.publish(AppConfig.Exchange.List);
        this.getDetail({}).then((res) => {
            this.events.publish(AppConfig.Home.Badge);
            // setTimeout(()=>{
            //     this.getFileListByHtml()
            // },200)
        });
    }
    ngOnDestroy() {
    }
    getFileListByHtml(){
        var fileList = new Array<IDownFile>();
        var s= document.getElementsByClassName("detail-content")
        if(s.length>0){
            var html = s[0];
            var ATageList = html.getElementsByTagName("a");
            // @ts-ignore
            for (let item of ATageList){
                if(this.getFileType(item.href)){
                    fileList.push({
                        fileext: "."+this.getFileType(item.href),
                        fileurl: item.href,
                        filename:item.innerText
                    })
                }
            }
            console.log(fileList)
            this.fileList=fileList
        }
    }

    getFileType(filePath){
        var startIndex = filePath.lastIndexOf(".");
        if(startIndex != -1)
            return filePath.substring(startIndex+1, filePath.length).toLowerCase();
        else return "";
    }
    edit(e) {
        this.nav('edit', {
            title: this.title,
            url: this.url,
            id: this.id
        });
    }
    async GetCommitList() {
        const res = await this.request('/work_dynamics/commitlist', {item_id: this.id});
        this.commitList = res.data;
    }
    async getReadNumber() {
        const res = await this.request(this.getReadUrl + this.id, {});
        this.readNumber = res.data.hasreader.length;
        this.noReadNumber = res.data.noreader.length;
    }
    async submit() {
        const params = {
            infoTitle: this.infoTitle,
            workId: this.id
        };
        await this.setRequest('/work_dynamics/commitadd', params);
        await this.dialogService.toast('回复成功！');
        this.infoTitle = '';
        await  this.GetCommitList();
    }
}
