import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../service/http.service';
import {BasePage} from '../../../base/base-page';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {DialogService} from '../../../service/dialog.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent extends BasePage implements OnInit {
    public photo = '';
    public fileUrl: any = '';
    params = {
        infoTitle: '',
        infoType: '1',
        infoContent: ''
    };
    constructor(
        public http: HttpService,
        public router: Router,
        public navController: NavController,
        public dialogService: DialogService,
        public route?: ActivatedRoute,
    ) {
        super(http, router, navController, dialogService);
    }

    ngOnInit() {}
    public submit() {
        this.setRequest('/notices/wenxuan_add', this.params).then((res) => {
             this.dialogService.alert('上传成功后回调：' + JSON.stringify(res),()=>{
                this.navController.back();
             });
        });
    }
}
