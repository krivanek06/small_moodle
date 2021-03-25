import {Component, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {
  AuthenticationModalComponent,
  AuthFeatureService,
  AuthFeatureStoreService,
  StUser, StUserMain
} from '@app/features/authentication-feature';
import {Observable} from 'rxjs';
import {IonicDialogService} from '@app/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$: Observable<StUserMain>;

  constructor(
    private popoverController: PopoverController,
    private authFeatureStoreService: AuthFeatureStoreService,
    private authFeatureService: AuthFeatureService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.user$ = this.authFeatureStoreService.getUserMain();
    this.user$.subscribe(x => console.log(x.photoURL));
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
