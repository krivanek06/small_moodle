import {Component, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {AuthenticationModalComponent, AuthFeatureService,} from '@app/features/authentication-feature';
import {Observable} from 'rxjs';
import {AuthFeatureStoreService, IonicDialogService, StUser} from '@app/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$: Observable<StUser>;

  constructor(
    private popoverController: PopoverController,
    private authFeatureStoreService: AuthFeatureStoreService,
    private authFeatureService: AuthFeatureService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.user$ = this.authFeatureStoreService.getUser();
  }

  redirectToDashboard() {
    this.router.navigate(['menu/dashboard']);
  }

  async authenticate() {
    const modal = await this.popoverController.create({
      component: AuthenticationModalComponent,
      cssClass: 'custom-popover',
    });
    await modal.present();
  }

  async logout() {
    await this.authFeatureService.logout();
    IonicDialogService.presentToast('Your have been successfully logged out');
  }
}
