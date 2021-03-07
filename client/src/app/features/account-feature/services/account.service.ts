import {Injectable} from '@angular/core';
import {CourseInviteMemberPopOverComponent} from "../../course-feature/entry-points/course-invite-member-pop-over/course-invite-member-pop-over.component";
import {PopoverController} from "@ionic/angular";
import {StUserMain} from "../../authentication-feature/models/user.interface";
import {CoursePublic} from "../../course-feature/model/courses.interface";
import {CourseInvitationConfirmationPopOverComponent} from "../../course-feature/entry-points/course-invitation-confirmation-pop-over/course-invitation-confirmation-pop-over.component";
import {IonicDialogService} from "../../../core/services/ionic-dialog.service";
import {COURSE_ROLES_ENUM} from "../../course-feature/model/course.enum";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private popoverController: PopoverController) {
  }

  async inviteMemberIntoCourse(userMain: StUserMain) {
    // present created courses by me
    let modal = await this.popoverController.create({
      component: CourseInviteMemberPopOverComponent,
      cssClass: 'custom-popover',
      componentProps: {
        userMain
      }
    });
    await modal.present();

    const coursePromise = await modal.onDidDismiss();
    const coursePublic: CoursePublic = coursePromise.data?.coursePublic;
    const selectedCourseRole: COURSE_ROLES_ENUM = coursePromise.data?.selectedCourseRole;

    if (!coursePublic) {
      return;
    }

    // confirmation message with selected course info
    const message = `Sending invitation to ${userMain.displayName} into course ${coursePublic.longName}`;
    modal = await this.popoverController.create({
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

    if(result){
      // TODO - sending firebase data to invite person into course
      IonicDialogService.presentToast(`${userMain.displayName} has been invited into ${coursePublic.longName} as ${selectedCourseRole}`);
    }

  }
}
