import { OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpService } from '../service/http.service';
import { DialogService } from '../service/dialog.service';
import {ActivatedRoute, Router} from '@angular/router';

export class BasePage implements OnInit {
    public title: string;
  constructor(
      public http: HttpService,
      public router: Router,
      public navController: NavController,
      public dialogService: DialogService,
      public route?: ActivatedRoute,
  ) {
  }

  ngOnInit() {}
  // 设置请求参数,子类实现
  public setParams() {
  }
  private isLogin() {
    if (!localStorage.isLogin) {
      // this.router.nav('login');
    }
  }
    nav(path, queryParams?) {
        return this.router.navigate([path], { queryParams});
    }
    query(name ) {
        return this.route.snapshot.queryParams[name];
    }
    getQueryParams() {
        return this.route.snapshot.queryParams;
    }
    getParams() {
        return this.route.snapshot.params;
    }


  public  request(url, data ): Promise < Iresponse > {
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
    public doRefresh(event) {
        event.target.complete();
    }
  public handleErr(data: Iresponse) {
      if (data.status_code === '10000') {
          this.dialogService.toast(data.msg);
      } else if (data.status_code === '30000') {
          this.dialogService.alert(data.msg, () => {
              this.navController.navigateRoot('login');
          });
      } else if (data.status_code === '30002') {
          this.dialogService.toast('参数错误！');
      }
  }
}
