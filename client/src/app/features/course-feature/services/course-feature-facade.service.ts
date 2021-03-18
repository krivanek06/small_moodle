import {Injectable} from '@angular/core';
import {CourseInviteMemberPopOverComponent} from "../entry-points/course-invite-member-pop-over/course-invite-member-pop-over.component";
import {PopoverController} from "@ionic/angular";
import {StUserMain} from "../../authentication-feature/models/user.interface";
import {CoursePublic} from "../model/courses-firebase.interface";
import {CourseInvitationConfirmationPopOverComponent} from "../entry-points/course-invitation-confirmation-pop-over/course-invitation-confirmation-pop-over.component";
import {COURSE_INVITATION_TYPE, COURSE_ROLES_ENUM} from "../model/course.enum";
import {IonicDialogService} from "../../../core/services/ionic-dialog.service";
import {CourseCreate, CourseInviteMemberConfirm} from "../model/course-module.interface";
import {InlineInputPopUpComponent} from "../../../shared/entry-points/inline-input-pop-up/inline-input-pop-up.component";
import {CourseFeatureDatabaseService} from "./course-feature-database.service";
import {AccountFeatureDatabaseService} from "../../account-feature/services/account-feature-database.service";
import {createCourseInvitation} from "../utils/course.convertor";

@Injectable({
  providedIn: 'root'
})
export class CourseFeatureFacadeService {

  constructor(private popoverController: PopoverController,
              private courseFeatureDatabaseService: CourseFeatureDatabaseService,
              private accountFeatureDatabaseService: AccountFeatureDatabaseService) {
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

  async addNewCourseCategory() {
    const modal = await this.popoverController.create({
      component: InlineInputPopUpComponent,
      cssClass: 'custom-popover',
      componentProps: {
        inputLabel: 'Please enter the name of new course category'
      }
    });
    await modal.present();
    const resultPromise = await modal.onDidDismiss();
    const name = resultPromise.data?.inputData;
    if (name) {
      await this.courseFeatureDatabaseService.addCourseCategory(name);
      IonicDialogService.presentToast(`Category ${name} has been created`);
    }
  }

  async addNewCourse(courseCreate: CourseCreate) {
    // create public / private data
    this.courseFeatureDatabaseService.saveCourse(courseCreate);

    // invite people
    const studentInvitation = createCourseInvitation(courseCreate.coursePublic, COURSE_ROLES_ENUM.STUDENT, COURSE_INVITATION_TYPE.RECEIVED);
    const markerInvitation = createCourseInvitation(courseCreate.coursePublic, COURSE_ROLES_ENUM.MARKER, COURSE_INVITATION_TYPE.RECEIVED);

    courseCreate.coursePrivate.invitedStudents.forEach(m => this.accountFeatureDatabaseService.addOrRemoveCourseInvitationForPerson(m, studentInvitation, true));
    courseCreate.coursePrivate.invitedMarkers.forEach(m => this.accountFeatureDatabaseService.addOrRemoveCourseInvitationForPerson(m, markerInvitation, true));

    // update my data -> course manage
    this.accountFeatureDatabaseService.saveCourseForUser(courseCreate.coursePublic.creator, courseCreate.coursePublic, COURSE_ROLES_ENUM.TEACHER);

    IonicDialogService.presentToast(`Course ${courseCreate.coursePublic.longName} has been created`);
  }
}
