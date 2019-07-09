import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.scss'],
})
export class BackComponent implements OnInit {
  @Output() back = new EventEmitter();
  constructor(
      public navController: NavController
  ) { }

  ngOnInit() {}
  goBack() {
    this.navController.back();
    this.back.emit();
  }

}
