import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthFeatureService } from '../../services/auth-feature.service';
import { AuthenticationLoginComponent } from '../../components/authentication-login/authentication-login.component';
import { AuthenticationRegisterComponent } from '../../components/authentication-register/authentication-register.component';
import { IonicDialogService } from '../../../../core/services/ionic-dialog.service';
import { LoginIUser, RegisterIUser } from '../../models/user.interface';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-authentication-modal',
  templateUrl: './authentication-modal.component.html',
  styleUrls: ['./authentication-modal.component.scss'],
})
export class AuthenticationModalComponent implements OnInit {
  @ViewChild('loginComp') loginComp: AuthenticationLoginComponent;
  @ViewChild('registrationComp')
  registrationComp: AuthenticationRegisterComponent;

  segmentValue = 'login';

  constructor(
    private authFeatureService: AuthFeatureService,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {}

  segmentChanged(event: CustomEvent) {
    this.segmentValue = event.detail.value;
  }

  async normalLogin(data: LoginIUser) {
    try {
      await this.authFeatureService.normalLogin(data);
      await this.popoverController.dismiss();
      IonicDialogService.presentToast('Your are successfully logged in');
    } catch (e) {
      this.loginComp.loginForm.reset();
      IonicDialogService.presentToast(e.message);
    }
  }

  async registration(registerIUser: RegisterIUser) {
    try {
      await this.authFeatureService.normalRegistration(registerIUser);
      await this.popoverController.dismiss();
      IonicDialogService.presentToast(
        'Your items has been successfully created'
      );
    } catch (e) {
      this.registrationComp.registrationForm.reset();
      IonicDialogService.presentToast(e.message);
    }
  }

  async signInWithGoogle() {
    try {
      await this.authFeatureService.googleSignIn();
      await this.popoverController.dismiss();
      IonicDialogService.presentToast(
        'Your items has been successfully created'
      );
    } catch (e) {
      this.registrationComp.registrationForm.reset();
      IonicDialogService.presentToast(e.message);
    }
  }
}
