import {Injectable} from '@angular/core';
import {
  CourseFeatureDatabaseService,
  CourseFeatureStoreService,
  CourseInvitationConfirmationPopOverComponent,
  CourseInviteMemberPopOverComponent,
  CoursePublic
} from '@app/features/course-feature';
import {PopoverController} from '@ionic/angular';
import {StUserMain} from '@app/features/authentication-feature';
import {COURSE_INVITATION_TYPE, COURSE_ROLES_ENUM,} from '../model/course.enum';
import {IonicDialogService} from '@app/core';
import {CourseCreate, CourseInviteMemberConfirm,} from '../model/course-module.interface';
import {InlineInputPopUpComponent} from '@shared/entry-points/inline-input-pop-up/inline-input-pop-up.component';
import {AccountFeatureDatabaseService} from '@app/features/account-feature';
import {createCourseInvitation} from '../utils/course.convertor';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CourseFeatureFacadeService {
  constructor(private popoverController: PopoverController,
              private courseFeatureDatabaseService: CourseFeatureDatabaseService,
              private accountFeatureDatabaseService: AccountFeatureDatabaseService,
              private courseFeatureStoreService: CourseFeatureStoreService,
              private router: Router) {
  }

  navigateToCoursePage() {
    this.router.navigate(['menu', 'course', this.courseFeatureStoreService.course.courseId]);
  }

  // need to select course on which I want to invite the user
  async inviteMember(userMain: StUserMain): Promise<void> {
    // present created courses by me
    const modal = await this.popoverController.create({
      component: CourseInviteMemberPopOverComponent,
      cssClass: 'custom-popover',
      componentProps: {
        userMain,
      },
    });
    await modal.present();

    const coursePromise = await modal.onDidDismiss();
    const coursePublic: CoursePublic = coursePromise.data?.coursePublic;
    const selectedCourseRole: COURSE_ROLES_ENUM = coursePromise.data?.selectedCourseRole;

    if (coursePublic) {
      await this.inviteMemberIntoCourse(userMain, coursePublic, selectedCourseRole);
    }
  }

  // show pop up to send invitation, and persist data for user and course
  async inviteMemberIntoCourse(userMain: StUserMain, coursePublic: CoursePublic, selectedCourseRole: COURSE_ROLES_ENUM) {
    const message = `Invite ${userMain.displayName} into course ${coursePublic.longName}`;
    const invitation = await this.courseMemberInvitationConfirmation(message, coursePublic, selectedCourseRole, true);

    if (invitation.confirm) {
      // invitation to student / marker
      await this.sendCourseInvitation(userMain, coursePublic, selectedCourseRole);
      // persist course with new invitation
      await this.courseFeatureDatabaseService.addPersonInvitationIntoCourse(coursePublic, userMain, selectedCourseRole);
      const mess = `${userMain.displayName} has been invited into ${coursePublic.longName} as ${invitation.role}`;
      IonicDialogService.presentToast(mess);
    }
  }

  async courseMemberInvitationConfirmation(message: string,
                                           coursePublic: CoursePublic,
                                           selectedCourseRole: COURSE_ROLES_ENUM,
                                           disabled: boolean): Promise<CourseInviteMemberConfirm> {
    const modal = await this.popoverController.create({
      component: CourseInvitationConfirmationPopOverComponent,
      cssClass: 'custom-popover',
      componentProps: {
        coursePublic,
        message,
        selectedCourseRole,
        disabled,
      },
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
        inputLabel: 'Please enter the name of new course category',
      },
    });
    await modal.present();
    const resultPromise = await modal.onDidDismiss();
    const name = resultPromise.data?.inputData;
    if (name) {
      await this.courseFeatureDatabaseService.addCourseCategory(name);
      IonicDialogService.presentToast(`Category ${name} has been created`);
    }
  }

  async addNewCourse(courseCreate: CourseCreate): Promise<void> {
    // create public / private data
    await this.courseFeatureDatabaseService.createNewCourse(courseCreate);

    // invite people
    courseCreate.coursePrivate.invitedStudents.forEach((m) =>
      this.sendCourseInvitation(m, courseCreate.coursePublic, COURSE_ROLES_ENUM.STUDENT));

    courseCreate.coursePrivate.invitedMarkers.forEach((m) =>
      this.sendCourseInvitation(m, courseCreate.coursePublic, COURSE_ROLES_ENUM.MARKER));

    // update my data -> course manage
    this.accountFeatureDatabaseService.saveCourseForUser(
      courseCreate.coursePublic.creator,
      courseCreate.coursePublic,
      COURSE_ROLES_ENUM.TEACHER
    );
  }

  private async sendCourseInvitation(student: StUserMain, coursePublic: CoursePublic, role: COURSE_ROLES_ENUM): Promise<void> {
    const studentInvitation = createCourseInvitation(
      coursePublic,
      role,
      COURSE_INVITATION_TYPE.RECEIVED
    );
    await this.accountFeatureDatabaseService.addOrRemoveCourseInvitationForPerson(student, studentInvitation, true)
  }
}
