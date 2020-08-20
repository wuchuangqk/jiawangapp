import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Events} from '@ionic/angular';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
})
export class StaffComponent implements OnInit {
  @Input() selectedStaff: any[];
  @Input() eventName: string;
  @Input() title: string;
  @Input() type = true;
  @Output() selectedStaffChange = new EventEmitter();
  public selectName = '';
  constructor(
      public events: Events,
  ) { }

  ngOnInit() {
    this.events.subscribe(this.eventName, (selectedStaff) => {
      this.selectedStaff = selectedStaff;
      this.selectName = this.selectedStaff.map(item => item.name).join(' ');
      this.selectedStaffChange.emit(this.selectedStaff);
    });
  }

  ngOnDestroy() {
    // 取消事件订阅
    this.events.unsubscribe(this.eventName);
  }

}
