import {Injectable} from '@angular/core';
import {CourseInviteMemberPopOverComponent} from "../entry-points/course-invite-member-pop-over/course-invite-member-pop-over.component";
import {PopoverController} from "@ionic/angular";
import {StUserMain} from "../../authentication-feature/models/user.interface";
import {CoursePublic} from "../model/courses-firebase.interface";
import {CourseInvitationConfirmationPopOverComponent} from "../entry-points/course-invitation-confirmation-pop-over/course-invitation-confirmation-pop-over.component";
import {COURSE_ROLES_ENUM} from "../model/course.enum";
import {IonicDialogService} from "../../../core/services/ionic-dialog.service";
import {CourseInviteMemberConfirm} from "../model/course-module.interface";

@Injectable({
  providedIn: 'root'
})
export class CourseFeatureService {

  constructor(private popoverController: PopoverController) {
  }

  async inviteMemberIntoCourse(userMain: StUserMain): Promise<void> {
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

    if (coursePublic) {
      const message = `Invite ${userMain.displayName} into course ${coursePublic.longName}`;
      const invitation = await this.inviteMemberIntoCourseConfirm(message, coursePublic, selectedCourseRole, false);
      if (invitation.confirm) {
        const mess = `${userMain.displayName} has been invited into ${coursePublic.longName} as ${invitation.role}`;
        IonicDialogService.presentToast(mess);
      }
    }
  }

  async inviteMemberIntoCourseConfirm(message: string,
                                      coursePublic: CoursePublic,
                                      selectedCourseRole: COURSE_ROLES_ENUM,
                                      disabled: boolean): Promise<CourseInviteMemberConfirm> {
    // confirmation message with selected course info
    const modal = await this.popoverController.create({
      component: CourseInvitationConfirmationPopOverComponent,
      cssClass: 'custom-popover',
      componentProps: {
        coursePublic,
        message,
        selectedCourseRole,
        disabled
      }
    });

    await modal.present();
    const resultPromise = await modal.onDidDismiss();
    const confirm = resultPromise.data?.accept as boolean;
    const role = resultPromise.data?.courseRole as COURSE_ROLES_ENUM;
    return {confirm, role};
  }
}
