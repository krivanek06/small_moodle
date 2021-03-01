import {Injectable} from '@angular/core';
import {AlertController, ToastController} from '@ionic/angular';


@Injectable({
    providedIn: 'root'
})
export class IonicDialogService {

    constructor(private alertController: AlertController,
                private toastController: ToastController) {
    }


    async presentAlertConfirm(message: string) {
        return new Promise(async (resolve) => {
            const alert = await this.alertController.create({
                cssClass: 'my-custom-alert-class',
                // header: 'Confirm!',
                message,
                buttons: [
                    {
                        text: 'Yes',
                        handler: () => {
                            resolve(true);
                        }
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                            resolve(false);
                        }
                    }
                ]
            });
            await alert.present();
        });
    }


    async presentToast(message) {
        const toast = await this.toastController.create({
            message,
            duration: 2500,
            color: 'dark',
            position: 'bottom',
        });
        toast.present();
    }


}
