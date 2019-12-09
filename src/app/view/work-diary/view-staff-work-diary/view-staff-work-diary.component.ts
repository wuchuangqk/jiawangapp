import {Component, OnInit} from '@angular/core';
import {BasePage} from '../../../base/base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Events, NavController} from '@ionic/angular';
import {DialogService} from '../../../service/dialog.service';

@Component({
  selector: 'app-view-staff-work-diary',
  templateUrl: './view-staff-work-diary.component.html',
  styleUrls: ['./view-staff-work-diary.component.scss'],
})
export class ViewStaffWorkDiaryComponent extends BasePage implements OnInit {
  public staffArray = [];
  public departArray = [];
  public departid: number;
   public isDepart = true; // 是部门还是人

  // public special = 0;
  public selectedStaff: any[] = [];
  constructor(
      public http: HttpService,
      public router: Router,
      public navController: NavController,
      public dialogService: DialogService,
      public events: Events,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService, route );

    this.departid = this.query('departid') || 0;
    this.isDepart = (this.query('isDepart') === 'true') ? true : false;
    console.log('是否为个人');
    console.log(this.isDepart);
    // this.special = Number(JSON.parse(localStorage.userInfo).special);

  }

  ngOnInit() {
      this.getList();
  }
  cc(item) {
    this.nav('work-diary/staff-work-diary', {title: item.name + '的工作日志', userid: item.id, isDepart: false});
  }
  getList() {
    if (this.isDepart) {
      this.request('/users/getdepartlist', {
      }).then((res) => {
        // this.staffArray = res.data.staffs;
        this.departArray = res.data;
      });
    } else {
      this.request('/staffs/list', {
        depart_id: this.departid
      }).then((res) => {
        this.staffArray = res.data.staffs;
        this.departArray = [];
      });
    }
  }

}
