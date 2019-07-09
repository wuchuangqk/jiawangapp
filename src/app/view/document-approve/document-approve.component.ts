import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../base/base-page';
import {HttpService} from '../../service/http.service';
import {DialogService} from '../../service/dialog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-document-approve',
  templateUrl: './document-approve.component.html',
  styleUrls: ['./document-approve.component.scss'],
})
export class DocumentApproveComponent extends BasePage implements OnInit {
  public selectedStaff = [];
  public _selectedStaff = [];
  public id: string;
  public payload = {
    morning: ''
  };
  constructor(
      public http: HttpService,
      public router: Router,
      public dialogService: DialogService,
      public navController: NavController,
      public route?: ActivatedRoute,
  ) {
    super(http, router, dialogService);
    this.title = this.query('title');
    this.id = this.query('id');
  }

  ngOnInit() {}
  go( eventName, selectedStaff) {
    localStorage.num = 0;
    this.nav('/receive-document/staff-select/0000', {
      title: 'aaa', url: 'bbb', depart_id: '0000',
      isSelectOne: false,
      eventName,
      selected_staff : JSON.stringify(selectedStaff),
      selectedStaff : JSON.stringify(selectedStaff)
    });
  }

  getIds(arr): string {
    return  arr.map(item => item.id).join(',');
  }
  /**
   * 保存
   * @param opinions
   */
  save(opinion: string) {
    const staff_ids = this.getIds(this.selectedStaff);
    const staff_viewids = this.getIds(this._selectedStaff);

    const params = new Map<string, string>();
    const payload: any = {
      url: '/documents/shenhe_docment',
      id: this.id
    };

    if (staff_ids.length > 0) {
      payload.staff_ids = staff_ids;
    }
    if (staff_viewids.length > 0) {
      payload.staff_viewids = staff_viewids;
    }
    params.set('opinion', opinion);
    payload.opinion = opinion;
    this.setRequest(payload.url, payload).then((res) => {
      this.dialogService.alert('审批完毕!');
      this.navController.back();
    });
  }
}
