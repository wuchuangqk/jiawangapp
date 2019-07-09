import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Events} from '@ionic/angular';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
})
export class StaffComponent implements OnInit {
  @Input() selectedStaff: object[];
  @Input() eventName: string;
  @Input() title: string;
  @Output() selectedStaffChange = new EventEmitter();
  constructor(
      public events: Events,
  ) { }

  ngOnInit() {
    this.events.subscribe(this.eventName, (selectedStaff) => {
      this.selectedStaff = selectedStaff;
      this.selectedStaffChange.emit(this.selectedStaff);
    });
  }

  ngOnDestroy() {
    // 取消事件订阅
    this.events.unsubscribe('getStaffs');
  }

}
