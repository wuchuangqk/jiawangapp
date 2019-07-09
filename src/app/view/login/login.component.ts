import { Component, OnInit } from '@angular/core';
import {Events, NavController, Platform} from '@ionic/angular';
import {BasePage} from '../../base/base-page';
import {HttpService} from '../../service/http.service';
import { AlertController } from '@ionic/angular';
import { DialogService } from '../../service/dialog.service';
import {AppConfig} from '../../app.config';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BasePage implements OnInit {
    public name: any;
    username = 'meilinhui';
    userid: number;
    password = '12345678';
    num: number;

    constructor(
        public http: HttpService,
        public router: Router,
        public dialogService: DialogService,
        private events: Events,
        private navController: NavController,
        private platform: Platform,
        private alertController: AlertController,
    ) {
        super(http, router, dialogService);
        // this.name = this.router.query('name');
        this.platform.ready().then(() => {
        });
    }

    ngOnInit() {
    }
    login() {
        this.dialogService.loading();
        this.request('/users/login', {
            username: this.username,
            password: this.password,
            os: 'android',
            packagename: 'ml',
            uuid: 'aaa'
        }).then((res) => {
            localStorage.access_token = res.data.access_token;
            this.dialogService.dismiss();
            this.navController.navigateRoot('home');
        });

    }
}
