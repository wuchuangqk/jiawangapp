import { Injectable } from '@angular/core';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private isLoading: boolean;
  constructor(
      private toastController: ToastController,
      private alertController: AlertController,
      private loadingController: LoadingController,
  ) {
  }
  async alert(message: string, backFn?: Function) {
    const alert = await this.alertController.create({
      message,
      buttons: [
        {
          text: '确定',
          role: 'cancel',
          handler: () => {
              if (backFn) {
                  backFn();
              }
          }
        }
      ]
    });
    alert.present();
  }
  async loading() {
    this.isLoading = true;
    return await this.loadingController.create({
        duration: 1500
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });

  }
  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }
  async toast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
      position: 'top'
    });
    toast.present();
  }
}
