import { Component, OnInit } from '@angular/core';
import { WishesService } from '../../services/wishes.service';
import { ActivatedRoute } from '@angular/router';
// import { List } from 'src/app/models/list.model';
import { ListItem } from '../../models/list-item-model';
import {List} from '../../models/list.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  list: List;
  itemName = '';

  constructor( private whishesService: WishesService,
               private router: ActivatedRoute) {

    const listId = this.router.snapshot.paramMap.get('listId');

    this.list = this.whishesService.getList( listId );

  }

  ngOnInit() {
  }

  addItem() {
    if ( this.itemName.length === 0 ) {
      return;
    }

    const newItem = new ListItem( this.itemName );
    this.list.items.push( newItem );

    this.itemName = '';

    this.whishesService.saveStorage();
  }

  changeCheck( item: ListItem ) {

    const todo = this.list.items.filter( itemData => !itemData.done)
                                .length;
    if ( todo === 0 ) {
      this.list.doneDate = new Date();
      this.list.done = true;
    } else {
      this.list.doneDate = null;
      this.list.done = false;
    }
    this.whishesService.saveStorage();
    console.log(this.list);
  }

  delete( i: number ) {
    this.list.items.splice(i, 1);
    this.whishesService.saveStorage();
  }
}
