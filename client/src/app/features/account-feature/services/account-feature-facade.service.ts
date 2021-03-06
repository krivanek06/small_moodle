import {Injectable} from '@angular/core';
import {PopoverController} from "@ionic/angular";
import {DisplayRolesPopOverComponent} from "../entry-points";
import {first} from "rxjs/operators";
import {AccountDatabaseService, IonicDialogService, StUserMain} from "@app/core";

@Injectable({
  providedIn: 'root'
})
export class AccountFeatureFacadeService {

  constructor(private popoverController: PopoverController,
              private accountFeatureDatabaseService: AccountDatabaseService) {
  }

  async showUserRoles(userMain: StUserMain) {
    const user = await this.accountFeatureDatabaseService.loadUser(userMain.uid).pipe(first()).toPromise();
    const modal = await this.popoverController.create({
      component: DisplayRolesPopOverComponent,
      cssClass: 'custom-popover',
      componentProps: {
        user,
      },
    });
    await modal.present();

    const coursePromise = await modal.onDidDismiss();
    const roles: string[] = coursePromise.data?.roles;
    if (roles) {
      await this.accountFeatureDatabaseService.changeRolesForUser(userMain.uid, roles);
      IonicDialogService.presentToast(`Roles for user ${userMain.displayName} has been changed`);
    }
  }
}
