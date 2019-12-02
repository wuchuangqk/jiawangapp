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

  public special = 0;
  public selectedStaff: any[] = [
    {
      name: '张山',
      uid: 1
    },
    {
      name: '李四',
      uid: 2
    }
  ];
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
    this.special = Number(JSON.parse(localStorage.userInfo).special);

  }

  ngOnInit() {
      this.getList();
  }
  cc(item) {
    console.log(item);
    this.nav('work-diary/staff-work-diary', {title: item.name + '的工作日志', userid: item.id});
  }
  getList() {
    this.request('/staffs/list', {
      depart_id: this.departid
    }).then((res) => {
      this.staffArray = res.data.staffs;
      this.departArray = res.data.departs;
    });
  }

}
