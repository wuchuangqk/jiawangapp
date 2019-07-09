import {Component, OnDestroy, OnInit} from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import { Staff } from './staff-model';
import { Contact, Depart } from './staff-select.model';
import {AppConfig} from '../../../app.config';
import {filter, mergeMap} from 'rxjs/operators';
import {Events, NavController} from '@ionic/angular';
@Component({
    selector: 'app-staff-select',
    templateUrl: './staff-select.component.html',
    styleUrls: ['./staff-select.component.scss'],
})
export class StaffSelectComponent extends BasePage implements OnInit, OnDestroy {
    title = '选择联系人';
    isSelectOne = false;
    departId = '0000';
    public eventName: string;

    staffArray = [];
    contact = {
        departArray: []
    };
    selectedStaff = [];
    selectedMap = [];
    isSelectedAll = false;
    hasSelectedAllButton = false;

    progressArray = [];
    constructor(
        public http: HttpService,
        public router: Router,
        public dialogService: DialogService,
        public events: Events,
        public navController: NavController,
        public route?: ActivatedRoute,
    ) {
        super(http, router, dialogService);
        // this.callback = this.query('callback');
        this.isSelectOne = this.query('isSelectOne') === 'true' ? true : false;
        console.log(this.isSelectOne);
        this.eventName = this.query('eventName');
    }

    ngOnInit() {
        this.selectedStaff = JSON.parse(this.query('selectedStaff'));
        this.departId = this.getParams().depart_id;
        localStorage.num = Number(localStorage.num) + 1;
        this.getList();
        this.events.subscribe(this.eventName, (selectedStaff) => {
            this.title = this.query('title');
            this.selectedStaff = selectedStaff;
            this.getList();
        });
    }
    goBack() {
        this.navController.back();
    }
    goB() {
        history.go(-(Number(localStorage.num)));
    }
    ionViewDidLeave() {
        this.events.publish(this.eventName, this.selectedStaff);
    }
    ngOnDestroy() {
        // 取消事件订阅
        this.events.unsubscribe(this.eventName);
    }
    getList() {
        this.request('/staffs/list', {
            depart_id: this.departId
        }).then((res) => {
            const data = res.data;
            this.staffArray = data.staffs;
            this.staffArray.map((item) => {
                if (this.isContains(item)) {
                    item.isSelected = true;
                }
                return item;
            });
            this.isSelectedAll = this.staffArray.every((item) => {
                return this.isContains(item);
            });

            // this.events.unsubscribe('staff');
            this.contact.departArray = data.departs;
            if (data.staffs.length !== 0) {
                if (this.isSelectOne) {
                    this.hasSelectedAllButton = false;
                    console.log(1);
                } else {
                    this.hasSelectedAllButton = true;
                }
            }

            // 初始化选中的状态

            this.checkIfSelectAll();
        });
    }
    selectAll(s) {
        this.isSelectedAll = !this.isSelectedAll;
        this.staffArray.map((item) => {
            item.isSelected = this.isSelectedAll;
            return item;
        });
        this.staffArray.forEach((item) => {
            if (item.isSelected) {
                if (!this.isContains(item)) {
                    this.addStaff(item);
                }
            } else {
                this.deleteStaff(item);
            }
        });
    }
    addStaff(item) {
        this.selectedStaff.push(item);
    }
    deleteStaff(item) {
        for (let i = 0 ; i < this.selectedStaff.length; i++) {
            if (item.id === this.selectedStaff[i].id) {
                this.selectedStaff.splice(i, 1);
            }
        }
    }
    public isContains(item): boolean {
        return this.selectedStaff.some((_ITEM) => {
            return _ITEM.id === item.id;
        });
    }
    departItemClick(item: Depart) {
        console.log(this.isSelectOne);
        this.nav(`/receive-document/staff-select/${item.id}`, {
            is_root: false,
            depart_id: item.id,
            title: item.name,
            eventName: this.eventName,
            isSelectOne : this.isSelectOne,
            selected_staff: JSON.stringify(this.selectedStaff),
            selectedStaff: JSON.stringify(this.selectedStaff),
            selected_map: this.selectedMap,
            progressArray: this.progressArray
        });
    }

    staffItemClick(isSelected, item) {
        item.isSelected = isSelected;
        if (this.isSelectOne) {
            if (item.isSelected) {
                this.selectedStaff = [item];
            } else {
                this.selectedStaff = [];
            }
        } else {
            item.isSelected ? this.addStaff(item) : this.deleteStaff(item);
            this.isSelectedAll = this.isSelectAll();
        }
    }
    isSelectAll() {
        // 判断是否全部选中
        return this.staffArray.every((item) => {
            return item.isSelected;
        });
    }
    checkIfSelectAll() {

    }
}
