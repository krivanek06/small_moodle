import {Injectable} from '@angular/core';
import {
  COURSE_ROLES_ENUM,
  CourseFeatureDatabaseService,
  CourseFeatureStoreService,
  CourseGrading,
  CourseInvitationConfirmationPopOverComponent,
  CourseInviteMemberPopOverComponent,
  CoursePublic,
  StCourseStudent
} from '@app/features/course-feature';
import {PopoverController} from '@ionic/angular';
import {StUserMain} from '@app/features/authentication-feature';
import {COURSE_INVITATION_TYPE} from '../model/course.enum';
import {IonicDialogService} from '@app/core';
import {CourseCreate, CourseInviteMemberConfirm,} from '../model/course-module.interface';
import {InlineInputPopUpComponent} from '@shared/entry-points/inline-input-pop-up/inline-input-pop-up.component';
import {Router} from '@angular/router';
import {createCourseInvitation} from "@course-feature/utils/course.builder";
import {CourseMemberInformationModalComponent} from "@app/pages/course/entry-points/course-member-information-modal/course-member-information-modal.component";

@Injectable({
  providedIn: 'root',
})
export class CourseFeatureFacadeService {
  constructor(private popoverController: PopoverController,
              private courseFeatureDatabaseService: CourseFeatureDatabaseService,
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

    if (coursePublic) {
      await this.inviteMemberIntoCourse(userMain, coursePublic, COURSE_ROLES_ENUM.STUDENT, false);
    }
  }

  // show pop up to send invitation, and persist data for user and course
  async inviteMemberIntoCourse(userMain: StUserMain,
                               coursePublic: CoursePublic,
                               selectedCourseRole: COURSE_ROLES_ENUM = COURSE_ROLES_ENUM.STUDENT,
                               disabled = true) {
    const message = `Invite ${userMain.displayName} into course ${coursePublic.longName}`;
    const invitation = await this.courseMemberInvitationConfirmation(message, coursePublic, selectedCourseRole, disabled);

    if (invitation.confirm) {
      // invitation to student / marker
      await this.sendCourseInvitation(userMain, coursePublic, invitation.role);
      // persist course with new invitation
      await this.courseFeatureDatabaseService.addPersonInvitationIntoCourse(coursePublic, userMain, invitation.role);
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

  async showCourseStudent(courseStudent: StCourseStudent) {
    const modal = await this.popoverController.create({
      component: CourseMemberInformationModalComponent,
      cssClass: 'custom-popover',
      componentProps: {
        courseStudent
      },
    });
    await modal.present();
    const resultPromise = await modal.onDidDismiss();
    if (resultPromise.data) {
      const course = this.courseFeatureStoreService.course;

      if (resultPromise.data.removeUser) {
        // removing from course
        if (await IonicDialogService.presentAlertConfirm(`Confirm removing ${courseStudent.displayName} from course ${course.longName}`)) {
          await this.courseFeatureDatabaseService.removeStudentFromCourse(course, courseStudent, COURSE_ROLES_ENUM.STUDENT);
          // TODO
          IonicDialogService.presentToast(`Studnet ${courseStudent.displayName} has been removed from course`);
        }
      } else if (resultPromise.data.grade) {
        // adding grade to student
        const grade = resultPromise.data.grade as CourseGrading;
        if (await IonicDialogService.presentAlertConfirm(`Confirm grading ${courseStudent.displayName} with grade: ${grade.mark}`)) {
          await this.courseFeatureDatabaseService.gradeStudent(course, courseStudent, grade)
          IonicDialogService.presentToast(`Studnet ${courseStudent.displayName} has been graded with ${grade.mark}`);
        }
      }
    }
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
    this.courseFeatureDatabaseService.saveCourseForUser(
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
    await this.courseFeatureDatabaseService.addOrRemoveCourseInvitationForPerson(student, studentInvitation, true)
  }
}
