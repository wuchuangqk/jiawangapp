import {Component, OnInit, ViewChild} from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import {DateProvider} from '../../../service/Date';
import {DatePipe} from '@angular/common';
import {Events, NavController} from '@ionic/angular';
import {AppConfig} from '../../../app.config';
import {JiTuanAddComponent} from '../ji-tuan-add/ji-tuan-add.component';
import {ZiGongSiAddComponent} from '../zi-gong-si-add/zi-gong-si-add.component';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss'],
})
export class AddComponent extends BasePage implements OnInit {
    @ViewChild('jiTuanAddComponent')
    jiTuanAddComponent:JiTuanAddComponent;
    @ViewChild('ziGongSiAddComponent')
    ziGongSiAddComponent:ZiGongSiAddComponent;
    index = 0;
    tempIndex = 0;
    curIndex = 0;
    constructor(
        public http: HttpService,
        public router: Router,
        public dialogService: DialogService,
        public navController: NavController,
        public dateProvider: DateProvider,
        public events: Events,
        public route?: ActivatedRoute,
    ) {
        super(http, router, navController, dialogService);
        this.title = this.query('title');
    }

    public save(): void {
        if(this.tempIndex == 0){
            this.jiTuanAddComponent.save()
        }else{
            this.ziGongSiAddComponent.save()
        }
    }

    onChange(event){
        this.curIndex = event.index
    }

}
