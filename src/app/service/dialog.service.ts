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
  async alert(message: string, backFn?, header?: string, text?: string) {
    const alert = await this.alertController.create({
      header: header || null,
      message,
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        },
        {
          text: text || '确定',
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
