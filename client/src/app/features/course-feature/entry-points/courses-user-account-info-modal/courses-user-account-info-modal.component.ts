import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {StUserPublic} from '@app/features/authentication-feature';
import {CourseFeatureFacadeService} from '@app/features/course-feature';
import {convertStUserPublicToMain} from '@app/features/account-feature';

@Component({
  selector: 'app-courses-user-account-info-modal',
  templateUrl: './courses-user-account-info-modal.component.html',
  styleUrls: ['./courses-user-account-info-modal.component.scss'],
})
export class CoursesUserAccountInfoModalComponent implements OnInit {
  userPublic: StUserPublic;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private courseFeatureServiceService: CourseFeatureFacadeService
  ) {
  }

  ngOnInit() {
    this.userPublic = this.navParams.get('userPublic');
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  inviteMemberIntoCourse() {
    const userMain = convertStUserPublicToMain(this.userPublic);
    this.courseFeatureServiceService.inviteMember(userMain);
  }
}
