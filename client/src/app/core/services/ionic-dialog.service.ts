import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable()
export class IonicDialogService {
  private static alertController: AlertController | undefined;
  private static toastController: ToastController | undefined;

  public constructor(
    alertController: AlertController,
    toastController: ToastController
  ) {
    IonicDialogService.alertController = alertController;
    IonicDialogService.toastController = toastController;
  }

  static async presentAlertConfirm(
    message: string,
    cancelButton = 'Cancel'
  ): Promise<boolean> {
    if (!IonicDialogService.alertController) {
      throw new Error('IonicDialogService.alertController not initialized');
    }
    return new Promise(async (resolve) => {
      const alert = await IonicDialogService.alertController.create({
        cssClass: 'my-custom-alert-class',
        // header: 'Confirm!',
        message,
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              resolve(true);
            },
          },
          {
            text: cancelButton,
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              resolve(false);
            },
          },
        ],
      });
      await alert.present();
    });
  }

  static async presentToast(message) {
    if (!IonicDialogService.toastController) {
      throw new Error('IonicDialogService.toastController not initialized');
    }

    const toast = await IonicDialogService.toastController.create({
      message,
      duration: 3500,
      color: 'dark',
      position: 'bottom',
    });
    toast.present();
  }
}
