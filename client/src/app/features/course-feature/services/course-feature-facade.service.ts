import {Injectable} from '@angular/core';
import {
  convertCourseIntoCoursePublic,
  Course,
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
import {AuthFeatureStoreService, StUserMain} from '@app/features/authentication-feature';
import {COURSE_INVITATION_TYPE} from '../model/course.enum';
import {IonicDialogService} from '@app/core';
import {CourseCreate, CourseInviteMemberConfirm,} from '../model/course-module.interface';
import {InlineInputPopUpComponent} from '@shared/entry-points/inline-input-pop-up/inline-input-pop-up.component';
import {Router} from '@angular/router';
import {createCourseInvitation} from "@course-feature/utils/course.builder";
import {CourseMemberInformationModalComponent} from "@app/pages/course/entry-points/course-member-information-modal/course-member-information-modal.component";
import {ConfirmationPopOverComponent} from "@shared/entry-points/confirmation-pop-over/confirmation-pop-over.component";

@Injectable({
  providedIn: 'root',
})
export class CourseFeatureFacadeService {
  constructor(private popoverController: PopoverController,
              private courseFeatureDatabaseService: CourseFeatureDatabaseService,
              private courseFeatureStoreService: CourseFeatureStoreService,
              private authFeatureStoreService: AuthFeatureStoreService,
              private router: Router) {
  }

  navigateToCoursePage() {
    this.router.navigate(['menu', 'course', this.courseFeatureStoreService.course.courseId]);
  }

  async enrolIntoCourse(course: CoursePublic) {
    // check if already member
    if (this.authFeatureStoreService.user.courses.map(c => c.course.courseId).includes(course.courseId)) {
      IonicDialogService.presentToast(`Your are already enrolled into course ${course.longName}`);
      return
    }

    // check if sent or got invitation
    if (this.authFeatureStoreService.user.courseSentInvitations.map(c => c.courseId).includes(course.courseId)) {
      IonicDialogService.presentToast(`Your sent and invitation into course ${course.longName}`);
      return
    }

    const message = `Do you want to enroll into course ${course.longName}, [${course.year}] as student ?`;
    if (await IonicDialogService.presentAlertConfirm(message)) {
      await this.courseFeatureDatabaseService.toggleStudentInvitation(course, this.authFeatureStoreService.userMain, true);
      await this.courseFeatureDatabaseService.toggleUserCourseSentInvitations(this.authFeatureStoreService.userMain, course, true);
      IonicDialogService.presentToast(`Your request has been sent, please wait for confirmation`);
    }
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
      await this.courseFeatureDatabaseService.togglePersonInvitationIntoCourse(coursePublic, userMain, invitation.role);
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

  async removeSentInvitation(course: Course, userMain: StUserMain, type: COURSE_ROLES_ENUM) {
    const modal = await this.popoverController.create({
      component: ConfirmationPopOverComponent,
      cssClass: 'custom-popover',
      componentProps: {
        message: `Please confirm removing invitation for ${type} ${userMain.displayName}`
      },
    });

    await modal.present();
    const resultPromise = await modal.onDidDismiss();

    if (resultPromise.data?.accept) {
      // remove invitation from course
      await this.courseFeatureDatabaseService.togglePersonInvitationIntoCourse(course, userMain, type, false);
      // remove invitation from user
      await this.courseFeatureDatabaseService.removePersonInvitation(course, userMain)
      IonicDialogService.presentToast(`Invitation for ${type} ${userMain.displayName} has been removed`);
    }

  }

  async showStudentReceivedInvitation(userMain: StUserMain, course: Course) {
    const modal = await this.popoverController.create({
      component: ConfirmationPopOverComponent,
      cssClass: 'custom-popover',
      componentProps: {
        message: `Please confirm ${userMain.displayName} invitation into course`,
        showReject: true
      },
    });

    await modal.present();
    const resultPromise = await modal.onDidDismiss();
    const coursePublic = convertCourseIntoCoursePublic(course);

    if (resultPromise.data?.accept) {
      await this.courseFeatureDatabaseService.toggleStudentInvitation(coursePublic, userMain, false);
      await this.courseFeatureDatabaseService.increaseStudents(coursePublic.courseId, true);
      await this.courseFeatureDatabaseService.saveCourseForUser(userMain, coursePublic, COURSE_ROLES_ENUM.STUDENT);
      await this.courseFeatureDatabaseService.addPersonIntoCourse(coursePublic, userMain, COURSE_ROLES_ENUM.STUDENT);
      await this.courseFeatureDatabaseService.toggleUserCourseSentInvitations(userMain, coursePublic, false)
      IonicDialogService.presentToast(`${userMain.displayName}'s invitation has been accepted`);
    } else if (resultPromise.data?.decline) {
      await this.courseFeatureDatabaseService.toggleStudentInvitation(course, userMain, false);
      await this.courseFeatureDatabaseService.toggleUserCourseSentInvitations(userMain, coursePublic, false)
      IonicDialogService.presentToast(`${userMain.displayName}'s invitation has been declined`);
    }
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
    await this.courseFeatureDatabaseService.toggleUserCourseReceivedInvitation(student, studentInvitation, true)
  }
}
