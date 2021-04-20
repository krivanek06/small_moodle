import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {AuthFeatureStoreService, convertStUserPublicToMain, StUser, StUserPublic} from "@app/core";

@Component({
  selector: 'app-courses-user-account-info-modal',
  templateUrl: './courses-user-account-info-modal.component.html',
  styleUrls: ['./courses-user-account-info-modal.component.scss'],
})
export class CoursesUserAccountInfoModalComponent implements OnInit {
  userPublic: StUserPublic;
  authenticatedUser: StUser; // me who is logged in

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private authFeatureStoreService: AuthFeatureStoreService
  ) {
  }

  ngOnInit() {
    this.userPublic = this.navParams.get('userPublic');
    this.authenticatedUser = this.authFeatureStoreService.user;
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  inviteMemberIntoCourse() {
    const userMain = convertStUserPublicToMain(this.userPublic);
    this.modalController.dismiss({inviteMember: userMain});
  }

  addRole() {
    const userMain = convertStUserPublicToMain(this.userPublic);
    this.modalController.dismiss({addRole: userMain});
  }
}
