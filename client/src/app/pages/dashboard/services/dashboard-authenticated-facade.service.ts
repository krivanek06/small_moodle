import {Injectable} from '@angular/core';
import {StUserPublic} from "../../../features/authentication-feature/models/user.interface";
import {CoursesUserAccountInfoModalComponent} from "../../../features/course-feature/entry-points/courses-user-account-info-modal/courses-user-account-info-modal.component";
import {ModalController, PopoverController} from "@ionic/angular";
import {CourseSearchModalComponent} from "../../../features/course-feature/entry-points/course-search-modal/course-search-modal.component";
import {CourseInvitation} from "../../../features/course-feature/model/courses-firebase.interface";
import {IonicDialogService} from "../../../core/services/ionic-dialog.service";
import {CourseFeatureService} from "../../../features/course-feature/services/course-feature.service";

@Injectable()
export class DashboardAuthenticatedFacadeService {

  constructor(private modalController: ModalController,
              private popoverController: PopoverController,
              private courseFeatureService: CourseFeatureService) {
  }

  async showCourseInvitation(invitation: CourseInvitation) {
    const longName = invitation.course.longName;
    const message = `Accept invitation into course ${longName}`;
    console.log('invitation', invitation)
    const result = await this.courseFeatureService.inviteMemberIntoCourseConfirm(message, invitation.course, invitation.invitedAs, true)

    if (result?.confirm) {
      console.log('accepted course invitation') // TODO call service
      IonicDialogService.presentToast(`Course ${longName} invitation has been accepted`);
    } else if (result?.confirm === false) {
      console.log('declined course invitation') // TODO call service
      IonicDialogService.presentToast(`Course ${longName} invitation has been declined`);
    }
  }

  async searchCoursesByCategory(categoryName: string) {
    const modal = await this.modalController.create({
      component: CourseSearchModalComponent,
      componentProps: {categoryName},
      cssClass: 'custom-modal'
    });
    await modal.present();
  }

  async showUserInformation(userPublic: StUserPublic) {
    const modal = await this.modalController.create({
      component: CoursesUserAccountInfoModalComponent,
      componentProps: {userPublic},
      cssClass: 'custom-modal'
    });
    await modal.present();
  }
}
