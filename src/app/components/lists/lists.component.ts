import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { WishesService } from '../../services/wishes.service';
import { Router } from '@angular/router';
import { List } from '../../models/list.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  @ViewChild( IonList ) list: IonList;
  @Input() done = true;

  constructor( public whishesService: WishesService,
               private router: Router,
               private alertCtrl: AlertController ) { }

  ngOnInit() {}

  selectedList( list: List ) {

    if ( this.done ) {
      this.router.navigateByUrl(`/tabs/tab2/add/${ list.id }`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/add/${ list.id }`);
    }
  }

  deleteList( list: List ) {
    this.whishesService.deleteList( list );
  }

  async editListName( list: List ) {
    const alert = await this.alertCtrl.create({
      header: 'Edit List Name',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: list.title
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('cancel');
            this.list.closeSlidingItems();
          }
        },
        {
          text: 'Save',
          handler: ( newText ) => {
            console.log(newText);
            if (newText.lenght === 0 ) {
              return;
            }

            list.title = newText.title;
            this.whishesService.saveStorage();
            this.list.closeSlidingItems();
          }
        }
      ]
    });
    alert.present();
  }
}
