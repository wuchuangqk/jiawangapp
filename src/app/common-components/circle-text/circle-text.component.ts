import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-circle-text',
  templateUrl: './circle-text.component.html',
  styleUrls: ['./circle-text.component.scss'],
})
export class CircleTextComponent implements OnInit {
  @Input() name: string;
  private _name: string;
  constructor() {
  }

  ngOnInit() {
      if (this.name.length > 2) {
        this._name = this.name.slice(1, 3);
      } else {
        this._name = this.name;
    }
  }

}
