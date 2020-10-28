import { OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpService } from '../service/http.service';
import { DialogService } from '../service/dialog.service';
import {ActivatedRoute, Router} from '@angular/router';

export class BasePage implements OnInit {
    public userId = 0;
    public title: string;
    constructor(
        public http: HttpService,
        public router: Router,
        public navController: NavController,
        public dialogService: DialogService,
        public route?: ActivatedRoute,
    ) {
        this.userId = this.getUserId();
    }

    ngOnInit() {}
    // 设置请求参数,子类实现
    public setParams() {
    }

    getUserId(){
        let userInfoStr =localStorage.userInfo;
        let userId= 0;
        if(userInfoStr){
            let userInfo = JSON.parse(userInfoStr)
            userId = userInfo.id;
        }
        this.userId = userId;
        return userId;
    }
    private isLogin() {
        if (!localStorage.isLogin) {
            // this.router.nav('login');
        }
    }

    // 导航到。。。页面
    nav(path, queryParams?) {
        return this.router.navigate([path], { queryParams});
    }
    /**
     * 获取到querystring里面的请求参数
     */
    query(name ) {
        return this.route.snapshot.queryParams[name];
    }
    getQueryParams(): any {
        return this.route.snapshot.queryParams;
    }
    getParams() {
        return this.route.snapshot.params;
    }
    public getIds(arr): string {
        return  arr.map(item => item.id).join(',');
    }

    public  request(url, data ): Promise <Iresponse> {
        if (localStorage.access_token) {
            data.access_token = localStorage.access_token;
        }
        return new Promise(((resolve) => {
            this.http.get('/api/v2' + url, data).then((response: Iresponse) => {
                if (response !== undefined) {
                    if (response.status_code === '200') {
                        resolve(response);
                    } else {
                        this.handleErr(response);
                    }
                }
            });
        }));
    }
    public setRequest(url, data): Promise<any> {
        return new Promise(((resolve) => {
            this.http.post('/api/v2' + url, data).then((response) => {
                if (response.status_code === '200') {
                    resolve(response);
                } else {
                    this.handleErr(response);
                }
            });
        }));
    }

    public uploadFile(url: string, data, filePath) {
        return  this.http.uploadFile('/api/v2' + url, data, filePath).catch((error) => {
            this.handleErr(error);
        });
    }

    public uploadFiles(url: string, data, files) {
        return  this.http.uploadFiles('/api/v2' + url, data, files).catch((error) => {
            this.handleErr(error);
        });
    }

    public  uploadFileByBlob(url: string, data, blob?,fileName?) {
        return  this.http.uploadFileByBlob('/api/v2' + url, data, blob,fileName).catch((error) => {
            this.handleErr(error);
        });
    }


    public doRefresh(event) {
        event.target.complete();
    }

    public handleErr(data: Iresponse) {
        if (data.status_code === '10000') {
            this.dialogService.toast(data.msg);
            this.dialogService.dismiss();
        } else if (data.status_code === '30000') {
            var isLogin=localStorage.isLogin;
            if(isLogin){
                localStorage.removeItem("isLogin")
                this.dialogService.alert(data.msg, () => {
                    // this.navController.navigateRoot('login');
                    this.http.logout();
                });
            }
        } else if (data.status_code === '30002') {
            this.dialogService.toast('参数错误！');
        } else if (data.status_code === '100') {
            this.dialogService.toast(data.msg);
        }
    }
}
