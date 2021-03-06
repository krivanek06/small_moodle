import {Component, OnInit} from '@angular/core';
import {PopoverController} from "@ionic/angular";
import {AuthenticationModalComponent} from "../../../features/authentication-feature/entry-points/authentication-modal/authentication-modal.component";
import {AuthFeatureService} from "../../../features/authentication-feature/services/auth-feature.service";
import {Observable} from "rxjs";
import {StUser} from "../../../features/authentication-feature/models/user.interface";
import {IonicDialogService} from "../../../core/services/ionic-dialog.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$: Observable<StUser>;

  constructor(private popoverController: PopoverController,
              private authService: AuthFeatureService) {
  }

  ngOnInit() {
    this.user$ = this.authService.getUser();
    this.user$.subscribe(console.log)
  }

  async authenticate() {
    const modal = await this.popoverController.create({
      component: AuthenticationModalComponent,
      cssClass: 'custom-popover'
    });
    await modal.present();
  }

  async logout() {
    await this.authService.logout();
    IonicDialogService.presentToast('Your have been successfully logged out');
  }

}
