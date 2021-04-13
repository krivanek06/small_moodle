import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {AuthFeatureStoreService, StUser, StUserPublic} from '@app/features/authentication-feature';
import {CourseFeatureFacadeService} from '@app/features/course-feature';
import {convertStUserPublicToMain} from '@app/features/account-feature';
import {AccountFeatureFacadeService} from "@account-feature/services/account-feature-facade.service";

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
    private courseFeatureFacadeService: CourseFeatureFacadeService,
    private authFeatureStoreService: AuthFeatureStoreService,
    private accountFeatureFacadeService: AccountFeatureFacadeService
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
    this.courseFeatureFacadeService.inviteMember(userMain);
  }

  addRole() {
    const userMain = convertStUserPublicToMain(this.userPublic);
    this.accountFeatureFacadeService.showUserRoles(userMain);
  }
}
