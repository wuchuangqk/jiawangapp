import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.scss'],
})
export class BackComponent implements OnInit {

  constructor(
      public navController: NavController
  ) { }

  ngOnInit() {}
  goBack() {
    this.navController.back();
  }

}
