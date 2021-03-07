import {Injectable} from '@angular/core';
import {StUserPublic} from "../../../features/authentication-feature/models/user.interface";
import {CoursesUserAccountInfoModalComponent} from "../../../features/course-feature/entry-points/courses-user-account-info-modal/courses-user-account-info-modal.component";
import {ModalController, PopoverController} from "@ionic/angular";
import {CourseSearchModalComponent} from "../../../features/course-feature/entry-points/course-search-modal/course-search-modal.component";
import {CourseInvitation} from "../../../features/course-feature/model/courses.interface";
import {CourseInvitationConfirmationPopOverComponent} from "../../../features/course-feature/entry-points/course-invitation-confirmation-pop-over/course-invitation-confirmation-pop-over.component";
import {IonicDialogService} from "../../../core/services/ionic-dialog.service";

@Injectable()
export class DashboardAuthenticatedFacadeService {

  constructor(private modalController: ModalController,
              private popoverController: PopoverController) {
  }

  async showCourseInvitation(invitation: CourseInvitation) {
    const coursePublic = invitation.course;
    const message = `Accept invitation into course ${coursePublic.longName}`;
    const modal = await this.popoverController.create({
      component: CourseInvitationConfirmationPopOverComponent,
      cssClass: 'custom-popover',
      componentProps: {
        coursePublic,
        message
      }
    });

    await modal.present();
    const resultPromise = await modal.onDidDismiss();
    const result = resultPromise.data?.accept;

    if (result) {
      console.log('accepted course invitation') // TODO call service
      IonicDialogService.presentToast(`Course ${coursePublic.longName} invitation has been accepted`);
    } else if(result === false) {
      console.log('declined course invitation') // TODO call service
      IonicDialogService.presentToast(`Course ${coursePublic.longName} invitation has been declined`);
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
