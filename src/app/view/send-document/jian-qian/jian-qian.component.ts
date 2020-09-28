import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../service/http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "../../../service/dialog.service";
import {Events, NavController} from "@ionic/angular";
import {BasePage} from "../../../base/base-page";

@Component({
  selector: 'app-jian-qian',
  templateUrl: './jian-qian.component.html',
  styleUrls: ['./jian-qian.component.scss'],
})
export class JianQianComponent extends BasePage implements OnInit {
  title = '';
  isSelectOne = false;
  departId = '0000';
  public id ="";
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
    super(http, router, navController, dialogService);
    // this.callback = this.query('callback');
    this.isSelectOne = this.query('isSelectOne') === 'true' ? true : false;
    console.log(this.isSelectOne);
    this.eventName = this.query('eventName');
    this.title = this.query('title');
    this.id = this.query('id');
  }

  ngOnInit() {
    this.getList();
    this.events.subscribe(this.eventName, (selectedStaff) => {
      this.title = this.query('title');
      this.selectedStaff = selectedStaff;
      this.getList();
    });
  }
  goBack() {
    localStorage.num = Number(localStorage.num) - 1;
    this.navController.back();
  }
  public async save() {
    await this.setRequest("/dispatch/labdelete",{
      staff_ids: this.getIds(this.selectedStaff)
    })
    this.navController.back();
  }
  ionViewDidLeave() {
    this.events.publish(this.eventName, this.selectedStaff);
  }
  ngOnDestroy() {
    // 取消事件订阅
    // this.events.unsubscribe(this.eventName);
  }
  getList() {
    this.request('/dispatch/labuser/'+this.id, {}).then((res) => {
      const data = res.data;
      this.staffArray = data;
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
  staffItemClick(isSelected, item) {
    item.isSelected = isSelected;
    if (this.isSelectOne) {
      this.cancelSelectAll();
      item.isSelected = isSelected;
      if (item.isSelected) {
        this.selectedStaff = [item];
      } else {
        this.selectedStaff = [];
      }
    } else {
      item.isSelected && !this.isContains(item) ? this.addStaff(item) : this.deleteStaff(item);
      this.isSelectedAll = this.isSelectAll();
    }
  }
  isSelectAll() {
    // 判断是否全部选中
    return this.staffArray.every((item) => {
      return item.isSelected;
    });
  }
  cancelSelectAll() {
    this.staffArray = this.staffArray.map((item) => {
      item.isSelected = false;
      return item;
    });
  }
  checkIfSelectAll() {

  }

}
