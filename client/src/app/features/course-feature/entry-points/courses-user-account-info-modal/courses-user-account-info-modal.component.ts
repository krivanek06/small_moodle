import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from "@ionic/angular";
import {StUserPublic} from "../../../authentication-feature/models/user.interface";
import {CourseFeatureFacadeService} from "../../services/course-feature-facade.service";
import {convertStUserPublicToMain} from "../../../account-feature/utils/convertor.util";
import {IonicDialogService} from "../../../../core/services/ionic-dialog.service";

@Component({
  selector: 'app-courses-user-account-info-modal',
  templateUrl: './courses-user-account-info-modal.component.html',
  styleUrls: ['./courses-user-account-info-modal.component.scss'],
})
export class CoursesUserAccountInfoModalComponent implements OnInit {
  userPublic: StUserPublic;

  constructor(private modalController: ModalController,
              private navParams: NavParams,
              private courseFeatureServiceService: CourseFeatureFacadeService) {
  }

  ngOnInit() {
    this.userPublic = this.navParams.get('userPublic');
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  inviteMemberIntoCourse() {
    const userMain = convertStUserPublicToMain(this.userPublic);
    this.courseFeatureServiceService.inviteMemberIntoCourse(userMain);
  }
}

