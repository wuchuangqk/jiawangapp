import { Component , Input, Output, EventEmitter} from '@angular/core';
import {Events} from '@ionic/angular';
@Component({
    selector: 'scroll-x',
    templateUrl: 'scroll-x.html'
})
export class ScrollXComponent {
    index = 0;
    @Input() menuList: any;
    @Output() getIndex = new EventEmitter<any>();
    text: string;

    constructor() {
        this.text = 'Hello World';
    }
    ngInit() {
        console.log(this.menuList);
    }
    getItem(index, item) {
        this.index = index;
        this.getIndex.emit(item);
    }

}
